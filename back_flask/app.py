import uuid
from flask import Flask, render_template, request, redirect, jsonify
import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
import argparse
import io
import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'
from PIL import Image
import datetime
import torch
from tempfile import NamedTemporaryFile
import model2_esrgan_super_resolution as esrgan
import model3_easy_ocr as ocr
import model4_roboflow_license_number_extractor as robo
import model1_img_classfication as vgg
import model_YOLOv5 as yolo

load_dotenv()  # Load variables from .env file

aws_access_key = os.environ.get('AWS_ACCESS_KEY_ID')
aws_secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')

def upload_to_s3_and_get_url(data, bucket_name, folder_name, file_name=None):
    if file_name is None:
        file_name = str(uuid.uuid4()) + ".jpg"
    
    s3 = boto3.client('s3', aws_access_key_id=aws_access_key, aws_secret_access_key=aws_secret_key)
    try:
        s3.upload_fileobj(data, bucket_name, f'{folder_name}/{file_name}')
        img_url = f"https://{bucket_name}.s3.ap-northeast-2.amazonaws.com/{folder_name}/{file_name}"
        return True, img_url, file_name
    except NoCredentialsError:
        return False, None, None     

app = Flask(__name__)

DATETIME_FORMAT = "%Y-%m-%d_%H:%M:%S"
# 번호판 짤린 이미지 저장할 폴더 경로
img_savefolder ="./test"

# 이미지 이름
file_name = str(uuid.uuid4()) + ".jpg"
# 이미지 흑백 변경후 이미지
after_path = f"./super_resolution/{file_name}"

@app.route("/main/record", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        if "file" not in request.files:
                return jsonify({"status":500, "error": "No file part"})

        file = request.files["file"]
        if not file:
            return jsonify({"status":500, "error": "No selected file"})

        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))

        # Step 1: YOLOv5
        try:
            with NamedTemporaryFile(delete=False, suffix=".jpg") as temp_img_file:
                temp_img_file.write(img_bytes)
                temp_img_file_name = temp_img_file.name
                file_name, plate_img = yolo.YOLOv5_Load(temp_img_file_name, img_savefolder)
                print(file_name, plate_img)
        except:
            return jsonify({"status":500, "error": "번호판 인식 불가"}) 
        print("fileName", file_name)
        file_path_name = f"./{file_name}"
        print("step1 passed")
        success, img_url, img_title = upload_to_s3_and_get_url(plate_img, 'licenseplate-iru', 'total/plate')
        

        # Step 2: Number Result 1 (VGG)
        vgg_result = vgg.model_result(file_path_name)
        print("step2 passed")

        # Step 3: Plate Preprocessing (Super-Resolution)
        esrgan.model_result(file_path_name, after_path)
        print("step3 passed")
        os.remove(file_path_name)

        # Step 4: Number Result 2 (OCR)
        ocr_result = ocr.model_result(after_path)
        print("step4 passed")

        # Step 5: Number Result 3 (License Number Extraction)
        robo_result = robo.model_result(after_path)
        print("step5 passed")

        return jsonify({
            "status" : 200,
            "predictedResults":{"vgg": vgg_result,
                                "ocr": ocr_result,
                                "robo": robo_result},
            "plateImgUrl": img_url,
            "plateImgTitle": img_title
        })    
    
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()
    app.run(host="localhost")  # debug=True causes Restarting with stat