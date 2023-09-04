import model2_esrgan_super_resolution as esrgan
import model3_easy_ocr as ocr
import model4_roboflow_license_number_extractor as robo
import model1_img_classfication as vgg
import model_YOLOv5 as yolo

# 번호판 짤린 이미지
after_img_file_name = "./test1/0b265606-9e12-46a6-a6cf-c5c3b256b7f1.jpg"
# 현장 사진
original_img_file_name = "./test/7bed5a41-2cbb-4a55-ae33-2513425d3121.jpg"
# 번호판 짤린 이미지 저장할 폴더 경로
img_savefolder ="./test1"

# 이미지 이름
file_name = "0da9c411-72f1-42ce-b451-ea9208f9c761.jpg"
# 이미지 흑백 변경전 이미지
before_path = f"./license_plate/{file_name}"
# 이미지 흑백 변경후 이미지
after_path = f"./super_resolution/{file_name}"



def main():
    # Step 1: YOLOv5
    #original_img_file_name = 로드할 이미지 파일 이름
    #img_savefolder = 저장할 이미지 폴더
    yolo.YOLOv5_Load(original_img_file_name, img_savefolder)
    
    # Step 2: Plate Preprocessing
    print()
    print("Preprocessing...")
    esrgan.model_result(after_img_file_name, after_path)    

    # Step 3: Number Result 1
    vgg.model_result(after_img_file_name)
    
    # Step 3: Number Result 2
    print()
    print("Model2 Result: ")
    ocr.model_result(after_path)

    # Step 4: Number Result 3    
    print()
    print("Model3 Result: ")    
    robo.model_result(after_path)
    print()

if __name__ == "__main__":
    main()