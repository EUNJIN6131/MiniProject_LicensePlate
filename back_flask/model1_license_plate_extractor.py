import torch
from PIL import Image, ImageDraw
import os

def predict_license_plate_numbers(image_path, model, class_labels, target_class_index=0, confidence_threshold=0.2):
    try:
        img = Image.open(image_path)
    except Exception as e:
        print(f"이미지 파일 열기 실패: {image_path} - {e}")
        return
    
    results = model([img])  # 모델에 이미지 전달하여 결과 받기

    draw = ImageDraw.Draw(img)  # 이미지에 그리기 객체 생성

    print(f"객체 감지 결과:")
    for detection in results.pred[0]:
        detection = detection.tolist()  # Tensor를 리스트로 변환
        x_min, y_min, x_max, y_max, confidence, class_num = detection

        if (
            detection is not None
            and confidence >= confidence_threshold 
            and int(class_num) == target_class_index  # class_num을 정수로 변환
        ):
            x_min = int(x_min)
            y_min = int(y_min)
            x_max = int(x_max)
            y_max = int(y_max)  
            
            # 직사각형 그리기
            draw.rectangle([x_min, y_min, x_max, y_max], outline="red", width=3)
            
            cropped_number = img.crop((x_min, y_min, x_max, y_max))           
            
            detected_class = str(int(class_num))  # 클래스 라벨을 숫자로 설정
            print(f"인식된 클래스: {detected_class}, 확률: {confidence:.2f}")
    
    img.show()  # 이미지에 그려진 결과 보여주기

if __name__ == "__main__":    
    model = torch.hub.load('ultralytics/yolov5', 'custom', path='./weights/yolov5_license_number.pt')
    model.eval()

    # 클래스 라벨 설정
    class_labels = ["license_plate_number"]

    # 이미지 파일 경로 설정
    image_path = "./test/0a9c80eb-360c-4b5e-b3eb-6cdf39994ee5_sr.jpg"

    predict_license_plate_numbers(image_path, model, class_labels)
