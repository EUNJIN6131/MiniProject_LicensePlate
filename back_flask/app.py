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
                return jsonify({"error": "No file part"})

        file = request.files["file"]
        if not file:
            return jsonify({"error": "No selected file"})

        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))

        # Step 1: YOLOv5
        with NamedTemporaryFile(delete=False, suffix=".jpg") as temp_img_file:
            temp_img_file.write(img_bytes)
            temp_img_file_name = temp_img_file.name
            file_name, plate_img = yolo.YOLOv5_Load(temp_img_file_name, img_savefolder)

        print("fileName", file_name)
        file_path_name = f"./{file_name}"
        print("step1 passed")
        success, img_url, img_title = upload_to_s3_and_get_url(plate_img, 'licenseplate-iru', 'total/plate')
        
        # Step 2: Plate Preprocessing (Super-Resolution)
        esrgan.model_result(file_path_name, after_path)
        print("step2 passed")

        # Step 3: Number Result 1 (VGG)
        vgg_result = vgg.model_result(file_path_name)
        print("step3 passed")
        os.remove(file_path_name)

        # Step 4: Number Result 2 (OCR)
        ocr_result = ocr.model_result(after_path)
        print("step4 passed")

        # Step 5: Number Result 3 (License Number Extraction)
        robo_result = robo.model_result(after_path)
        print("step5 passed")

        return jsonify({
            "predictedResults":{"vgg": vgg_result,
                                "ocr": ocr_result,
                                "robo": robo_result},
            "plateImgUrl": img_url,
            "plateImgTitle": img_title
        })    
        # return jsonify({
        #     "predictedResults":{"vgg": ["7290", 60.24989],
        #                         "ocr": ["4230", 30.12412],
        #                         "robo": ["1123", 73.1255]},
        #     "plateImgUrl": "img_url",
        #     "plateImgTitle": "img_title"
        # })    
    
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()
    app.run(host="localhost")  # debug=True causes Restarting with stat


# import argparse
# import io
# import os
# import uuid
# from PIL import Image
# import torch
# from flask import Flask, render_template, request, redirect, jsonify
# import boto3
# from botocore.exceptions import NoCredentialsError
# from dotenv import load_dotenv
# import random

# load_dotenv()  # Load variables from .env file

# aws_access_key = os.environ.get('AWS_ACCESS_KEY_ID')
# aws_secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')

# def upload_to_s3_and_get_url(data, bucket_name, folder_name, file_name=None):
#     if file_name is None:
#         file_name = str(uuid.uuid4()) + ".jpg"
    
#     s3 = boto3.client('s3', aws_access_key_id=aws_access_key, aws_secret_access_key=aws_secret_key)
#     try:
#         s3.upload_fileobj(data, bucket_name, f'{folder_name}/{file_name}')
#         img_url = f"https://{bucket_name}.s3.ap-northeast-2.amazonaws.com/{folder_name}/{file_name}"
#         return True, img_url, file_name
#     except NoCredentialsError:
#         return False, None, None     

# app = Flask(__name__)

# DATETIME_FORMAT = "%Y-%m-%d_%H:%M:%S"

# @app.route("/main/record", methods=["GET", "POST"])
# def predict():
#     if request.method == "POST":
#         file = request.files["file"]
#         img_bytes = file.read()
#         img = Image.open(io.BytesIO(img_bytes))
#         results = model([img])

#         results.render()  # updates results.imgs with boxes and labels
#         target_class_index = 1
#         confidence_threshold = 0.6  # 신뢰도
#         for detection in results.pred[0]:
#             x_min, y_min, x_max, y_max, confidense, class_num = detection
#             if (detection is not None
#                 and confidense >= confidence_threshold 
#                 and class_num == target_class_index):
#                 x_min = int(x_min)
#                 y_min = int(y_min)
#                 x_max = int(x_max)
#                 y_max = int(y_max)
#                 img_with_box = img.crop((x_min, y_min, x_max, y_max))
#                 img_byte_array = io.BytesIO()
#                 img_with_box.save(img_byte_array, format='JPEG')
                
#                 success, img_url, img_title = upload_to_s3_and_get_url(img_byte_array, 'licenseplate-iru', 'total/plate')
#                 if success:
#                     # Return the URL in the response
#                     response_data = {
#                         "predictedResults": [[random.randint(1000, 10000) , round(random.random()*100, 1)], [random.randint(1000, 10000) , round(random.random()*100, 1)], [random.randint(1000, 10000) , round(random.random()*100, 1)]],
#                         "plateImgUrl": img_url,
#                         "plateImgTitle": img_title,
#                     }
#                     return jsonify(response_data), 200
#                 else:
#                     return "Failed to upload image to S3.", 500

#         return "No object detected."
#     return
    
# if __name__ == "__main__":
#     parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
#     parser.add_argument("--port", default=5000, type=int, help="port number")
#     args = parser.parse_args()

#     model = torch.hub.load('ultralytics/yolov5','custom', path='./best.pt')  # force_reload = recache latest code
#     model.eval()
#     app.run(host="localhost")  # debug=True causes Restarting with stat