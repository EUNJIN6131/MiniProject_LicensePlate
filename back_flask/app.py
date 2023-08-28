# from flask import Flask, render_template, request, jsonify
# from PIL import Image
# import numpy as np
# import h5py
# import tensorflow as tf
# from tensorflow.keras.optimizers.schedules import ExponentialDecay
# from tensorflow.keras.optimizers import Adam

# # Flask 애플리케이션 생성
# app = Flask(__name__)

# @app.route('/main/record', methods=['GET', 'POST'])
# def upload_predict():
#     if request.method == 'POST':
#         try:
#             prediction_results = [["0833", 60.0], ["0821", 30.0], ["0107", 10.0]]
#             return jsonify(prediction_results)
#         except Exception as e:
#             return str(e), 500  

# if __name__ == '__main__':
   
#     app.run(host="localhost")


# """
# Simple app to upload an image via a web form 
# and view the inference results on the image in the browser.
# """
import argparse
import io
import os
from PIL import Image
import datetime

import torch
from flask import Flask, render_template, request, redirect, jsonify

#app = Flask(__name__)
app = Flask(__name__, static_url_path='/static')

DATETIME_FORMAT = "%Y-%m-%d_%H-%M-%S-%f"

@app.route("/main/record", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        if "file" not in request.files:
            return redirect(request.url)
        file = request.files["file"]
        if not file:
            return

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
                now_time = datetime.datetime.now().strftime(DATETIME_FORMAT)
                img_savename = f"./{now_time}.jpg"
                img_with_box.save(img_savename)
                prediction_results = [["0008", 60.0], ["0821", 30.0], ["0107", 10.0]]
                return jsonify(prediction_results)
        return "No object detected."

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()

    model = torch.hub.load('ultralytics/yolov5','custom', path='./best.pt')  # force_reload = recache latest code
    model.eval()
    app.run(host="localhost")  # debug=True causes Restarting with stat