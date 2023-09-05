import tensorflow as tf
import os
from keras.models import load_model
import numpy as np
from PIL import Image
from keras.preprocessing import image

def model_result(path):
    # 이미지 경로 지정
    base_dir = './license_plate_number'
    number_arr = []
    for train_license_plate in os.listdir(base_dir):
        train_license_plate = os.path.join(base_dir,train_license_plate)
        #print(train_license_plate)
        number_arr.append(train_license_plate)
    #print(test)

    # 모델 로드
    loaded_model = load_model('./weights/img_classfication.h5')

    # 이미지 로드 및 크기 조정
    img = image.load_img(path, target_size=(150, 150))

    # 이미지 배열로 변환 및 차원 확장
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)

    # 이미지 데이터 정규화
    x = x / 255.0

    # 모델로 예측 수행
    predictions = loaded_model.predict(x)[0]  # 첫 번째 이미지에 대한 예측 결과

    # 클래스 이름 설정 (클래스 이름 리스트가 있다면 해당 리스트 사용)
    class_names = []
    for i in number_arr:
        class_names.append(i[-4:])
    #class_names = ['CassFresh', 'budweiser', 'filite', 'hineken', 'jinro']  # 예시 클래스 이름
    print(len(class_names))

    # 확률이 높은 상위 3개 클래스 출력
    top_classes_indices = np.argsort(predictions)[::-1][:1]  # 상위 3개 클래스의 인덱스
    for i, class_index in enumerate(top_classes_indices):
        class_name = class_names[class_index]
        confidence = predictions[class_index] * 100
    return [class_name, confidence]
