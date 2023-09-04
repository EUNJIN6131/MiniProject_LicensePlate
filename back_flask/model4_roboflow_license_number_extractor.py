from roboflow import Roboflow
import numpy as np
import cv2

rf = Roboflow(api_key="IhcDYxqLRcjLRLZ2Dc1J")
project = rf.workspace().project("license_plate_recognition-k9hpj")
model = project.version(6).model

# 이미지 파일 경로 설정
image_path = None
def model_result(image_path):
    classes = []
    confidences = []
    # 이미지 데이터를 사용하여 예측 결과 가져오기
    result = model.predict(image_path, confidence=30, overlap=30).json()
    predictions = result['predictions']

    sorted_predictions = sorted(predictions, key=lambda x: (round(x['x']), x['confidence']), reverse=False)

    highest_confidence_by_x = {}

    for prediction in sorted_predictions:
        rounded_x = round(prediction['x'])
        if rounded_x not in highest_confidence_by_x or prediction['confidence'] > highest_confidence_by_x[rounded_x]['confidence']:
            highest_confidence_by_x[rounded_x] = prediction

    for x, prediction in highest_confidence_by_x.items():
        print(f'class: {prediction["class"]}, confidence: {prediction["confidence"]:.2f}')
        classes.append(prediction["class"])
        confidences.append(prediction["confidence"])
    return classes, confidences

if __name__ == "__main__":
    model_result()
