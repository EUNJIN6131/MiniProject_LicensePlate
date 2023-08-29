import argparse
import io
import os
from PIL import Image
import datetime
import torch
from flask import Flask, render_template, request, redirect, jsonify
import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env file

aws_access_key = os.environ.get('AWS_ACCESS_KEY_ID')
aws_secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')

def upload_to_s3(data, bucket_name, folder_name, object_name=None):
    if object_name is None:
        object_name = f"{datetime.datetime.now().strftime(DATETIME_FORMAT)}.jpg"
    
    s3 = boto3.client('s3', aws_access_key_id = aws_access_key, aws_secret_access_key = aws_secret_key)
    try:
        s3.upload_fileobj(data, bucket_name, f'{folder_name}/{object_name}')
        return True
    except NoCredentialsError:
        return False    

#app = Flask(__name__)
app = Flask(__name__, static_url_path='/static')

DATETIME_FORMAT = "%Y-%m-%d_%H-%M-%S-%f"

@app.route("/main/record", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        file = request.files["file"]
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))
        results = model([img])

        results.render()  # updates results.imgs with boxes and labels
        target_class_index = 1
        confidence_threshold = 0.6  # 신뢰도
        for detection in results.pred[0]:
            x_min, y_min, x_max, y_max, confidense, class_num = detection
            if (detection is not None
                and confidense >= confidence_threshold 
                and class_num == target_class_index):
                x_min = int(x_min)
                y_min = int(y_min)
                x_max = int(x_max)
                y_max = int(y_max)
                img_with_box = img.crop((x_min, y_min, x_max, y_max))
                img_byte_array = io.BytesIO()
                img_with_box.save(img_byte_array, format='JPEG')
                
                if upload_to_s3(img_byte_array, 'licenseplate-iru', 'predicted'):
                    # If successful, return a response
                    prediction_results = [["0008", 60.0], ["0821", 30.0], ["0107", 10.0]]
                    return jsonify(prediction_results)
                else:
                    return "Failed to upload image to S3.", 500

        return "No object detected."
    return
    
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()

    model = torch.hub.load('ultralytics/yolov5','custom', path='./best.pt')  # force_reload = recache latest code
    model.eval()
    app.run(host="localhost")  # debug=True causes Restarting with stat