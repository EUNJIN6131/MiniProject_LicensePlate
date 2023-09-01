import os
import time
import tensorflow as tf
import tensorflow_hub as hub
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

# 파일 경로 설정
SAVED_MODEL_PATH = "https://tfhub.dev/captain-pool/esrgan-tf2/1"
IMAGE_PATH = "./test/0a2ad9a3-fb69-4656-b494-880e57e7d961.jpg"  # 원하는 이미지 파일 경로

# ESRGAN 모델 불러오기
model = hub.load(SAVED_MODEL_PATH)

# 이미지 전처리
def preprocess_image(image_path):
    hr_image = tf.image.decode_image(tf.io.read_file(image_path))
    
    # 컬러 이미지를 흑백으로 변환
    hr_image = tf.image.rgb_to_grayscale(hr_image)
    
    # 흑백 이미지를 컬러로 변환
    hr_image = tf.image.grayscale_to_rgb(hr_image)
    
    # 타 모델의 호환성 증가 (4의 배수)
    hr_size = (tf.convert_to_tensor(hr_image.shape[:-1]) // 4) * 4
    hr_image = tf.image.crop_to_bounding_box(hr_image, 0, 0, hr_size[0], hr_size[1])
    hr_image = tf.cast(hr_image, tf.float32)
    return tf.expand_dims(hr_image, 0)

# 이미지 저장
def save_image(image, filename):
    if not isinstance(image, Image.Image):
        image = tf.clip_by_value(image, 0, 255)
        image = Image.fromarray(tf.cast(image, tf.uint8).numpy())
    image.save(filename)

# 원하는 이미지에 대한 ESRGAN 적용  
hr_image = preprocess_image(IMAGE_PATH)
start = time.time()
fake_image = model(hr_image)
fake_image = tf.squeeze(fake_image)
print("Time Taken: %f" % (time.time() - start))

# 개선된 이미지로 변경 (덮어쓰기)
save_image(tf.squeeze(fake_image), filename=IMAGE_PATH)
print("Image processed and saved.")


# 하위 폴더 전체 jpg 파일 적용하고 싶으면 이거 쓰시면 됩니다.
# import time
# import tensorflow as tf
# import tensorflow_hub as hub
# import matplotlib.pyplot as plt
# import numpy as np
# from PIL import Image
# import os

# # 파일 경로 설정
# SAVED_MODEL_PATH = "https://tfhub.dev/captain-pool/esrgan-tf2/1"
# BASE_DIR = "./dataset"  # 원하는 폴더 경로

# # ESRGAN 모델 불러오기
# model = hub.load(SAVED_MODEL_PATH)

# # 이미지 전처리
# def preprocess_image(image_path):
#     hr_image = tf.image.decode_image(tf.io.read_file(image_path))
    
#     # 컬러 이미지를 흑백으로 변환
#     hr_image = tf.image.rgb_to_grayscale(hr_image)
    
#     # 흑백 이미지를 컬러로 변환
#     hr_image = tf.image.grayscale_to_rgb(hr_image)
    
#     hr_size = (tf.convert_to_tensor(hr_image.shape[:-1]) // 4) * 4
#     hr_image = tf.image.crop_to_bounding_box(hr_image, 0, 0, hr_size[0], hr_size[1])
#     hr_image = tf.cast(hr_image, tf.float32)
#     return tf.expand_dims(hr_image, 0)

# # 이미지 저장
# def save_image(image, filename):
#     if not isinstance(image, Image.Image):
#         image = tf.clip_by_value(image, 0, 255)
#         image = Image.fromarray(tf.cast(image, tf.uint8).numpy())
#     image.save(filename)

# # 모든 jpg 파일들 가져오기
# def get_all_jpg_files(base_dir):
#     file_list = []
#     for root, dirs, files in os.walk(base_dir):
#         for file in files:
#             if file.endswith(".jpg"):
#                 file_list.append(os.path.join(root, file))
#     return file_list

# all_jpg_files = get_all_jpg_files(BASE_DIR)

# # 모든 jpg 이미지에 대해 ESRGAN 적용
# for file_path in all_jpg_files:
#     hr_image = preprocess_image(file_path)
#     start = time.time()
#     fake_image = model(hr_image)
#     fake_image = tf.squeeze(fake_image)
#     print(f"Time Taken for {file_path}: {time.time() - start}")
#     save_image(tf.squeeze(fake_image), filename=file_path)

# print("All images processed and saved.")