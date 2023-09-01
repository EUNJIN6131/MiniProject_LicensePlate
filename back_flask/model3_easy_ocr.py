import easyocr
import cv2

# 언어 선택 / GPU 사용여부 (현재 : CPU)
reader = easyocr.Reader(['en'], gpu=False)

# 이미지 삽입 경로
input_path = "./test/20180710-184551-000013-0.jpg"

def image_reader(image):
    result = reader.readtext(image, allowlist='0123456789')

    max_confidence = -1  # 초기화
    selected_text = None

    for detection in result:
        bbox = detection[0]
        text = detection[1]
        confidence = detection[2]

        # 가장 높은 신뢰도를 가진 텍스트 선택
        if confidence > max_confidence:
            max_confidence = confidence
            selected_text = text
            selected_bbox = bbox

    if selected_text:
        x_min, y_min = map(int, selected_bbox[0])
        x_max, y_max = map(int, selected_bbox[2])

        # 이미지에 바운딩 박스 그리기
        cv2.rectangle(image, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
        cv2.putText(image, f'{selected_text}', (x_min, y_min - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # 콘솔에 텍스트와 신뢰도 출력
        print(f'Class: {selected_text}, Confidence: {max_confidence:.2f}')

        return image

def main():
    image = cv2.imread(input_path)
    result1 = image_reader(image)
    if result1 is not None:
        cv2.imshow("Result", result1)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
    else:
        print("No text detected.")

if __name__ == "__main__":
    main()
