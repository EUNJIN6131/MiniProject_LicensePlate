from flask import Flask, render_template, request, jsonify
from PIL import Image
import numpy as np
import h5py
import tensorflow as tf
from tensorflow.keras.optimizers.schedules import ExponentialDecay
from tensorflow.keras.optimizers import Adam

# Flask 애플리케이션 생성
app = Flask(__name__)

# 모델 로드 및 클래스 이름 설정
# 이 부분은 모델 로드와 클래스 이름 설정하는 부분으로 대체되어야 합니다.
class_names = ['CassFresh', 'budweiser', 'filite', 'hineken', 'jinro']  # 예시 클래스 이름

@app.route('/main/record', methods=['GET', 'POST'])
def upload_predict():
    if request.method == 'POST':
        try:

            # 업로드한 이미지 처리
            # image_file = request.files['file']
            # if image_file:
            #     img = Image.open(image_file)
            #     img = img.resize((150,150))
            #     x = np.array(img)
            #     x = np.expand_dims(x, axis=0)
            #     x = x / 255.0

            #     # 모델로 예측 수행
            #     predictions = model.predict(x)[0]
            #     top_class_indices = np.argsort(predictions)[::-1][:3]
                
            #     for class_index in top_class_indices:
            #         class_name = class_names[class_index]
            #         confidence = predictions[class_index] * 100
            #         prediction_results.append((class_name, confidence))

            prediction_results = [{"text":"1234", "accuracy":60.0}, {"text":"1234123", "accuracy":30.0}, {"text":"1234152", "accuracy":10.0}]
            return jsonify(prediction_results)
        except Exception as e:
            return str(e), 500  # Return an error response

if __name__ == '__main__':
    # 모델 로드 및 초기화
    # model = tf.keras.models.load_model('./complete_model.h5')  # 모델 로드 및 초기화 부분

    # Flask 애플리케이션 실행
    app.run(host="localhost")
