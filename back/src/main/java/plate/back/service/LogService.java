package plate.back.service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import plate.back.dto.HistoryDto;
import plate.back.dto.LogDto;
import plate.back.dto.PredictDto;
import plate.back.dto.Response;
import plate.back.entity.HistoryEntity;
import plate.back.entity.ImageEntity;
import plate.back.entity.LogEntity;
import plate.back.entity.PredictLogEntity;
import plate.back.persistence.CarInfoRepository;
import plate.back.persistence.HistoryRepository;
import plate.back.persistence.ImageRepository;
import plate.back.persistence.LogRepository;
import plate.back.persistence.PredictLogRepository;

@RequiredArgsConstructor
@Service
public class LogService {
    private final CarInfoRepository carRepo;
    private final LogRepository logRepo;
    private final ImageRepository imgRepo;
    private final PredictLogRepository predRepo;
    private final HistoryRepository histRepo;
    private final FileService fileService;
    private final FlaskService flaskService;
    private final Response response;

    // public LogDto recordLog(MultipartFile file) throws IOException {
    public ResponseEntity<?> recordLog(MultipartFile file) throws IOException {
        Object[] dtos = new Object[2];
        // flask api 호출
        LinkedHashMap<String, Object> flaskResponse = (LinkedHashMap<String, Object>) flaskService.callApi(file)
                .getBody();
        if ((int) flaskResponse.get("status") == 500) {
            return response.fail((String) flaskResponse.get("error"), HttpStatus.BAD_REQUEST);
        }
        LinkedHashMap<String, ArrayList<Object>> predictValue = (LinkedHashMap<String, ArrayList<Object>>) flaskResponse
                .get("predictedResults");

        ArrayList<PredictDto> predList = new ArrayList<>();
        for (String key : predictValue.keySet()) {
            List<Object> list = predictValue.get(key);
            if (list == null) {
                predList.add(new PredictDto(key, "예측실패", 0));
            } else {
                predList.add(new PredictDto(key, String.valueOf(list.get(0)), (double) list.get(1)));
            }
        }

        boolean flag = false;
        for (int i = 0; i < predList.size(); i++) {
            PredictDto dto = predList.get(i);
            if (carRepo.findById(String.valueOf(dto.getPredictedText())).isPresent()) {
                dto.setPresent(true);
                flag = true;
            }
        }

        double maxVal = 0;
        int idx = 0;
        for (int i = 0; i < predList.size(); i++) {
            PredictDto dto = predList.get(i);
            if (dto.isPresent() && maxVal < (double) dto.getAccuracy()) {
                maxVal = dto.getAccuracy();
                idx = i;
            }
        }

        // Log 엔티티 저장
        LogEntity savedLog;
        if (flag) {
            savedLog = logRepo.save(LogEntity.builder()
                    .modelType(predList.get(idx).getModelType())
                    .licensePlate(predList.get(idx).getPredictedText())
                    .accuracy(maxVal)
                    .state("수정 불필요").build());
        } else {
            savedLog = logRepo.save(LogEntity.builder()
                    .modelType("-")
                    .licensePlate("-")
                    .accuracy(0.0)
                    .state("수정 필요").build());
        }

        // Image 엔티티 저장
        // 원본 file 업로드(Aws S3)
        String[] vehicleImgArr = fileService.uploadFile(file, 0);
        String vehicleImgUrl = vehicleImgArr[0];
        String vehicleImgTitle = vehicleImgArr[1];
        String plateImgUrl = String.valueOf(flaskResponse.get("plateImgUrl"));
        String plateImgTitle = String.valueOf(flaskResponse.get("plateImgTitle"));

        ImageEntity vehicleImg = imgRepo.save(ImageEntity.builder()
                .logEntity(savedLog)
                .imageUrl(vehicleImgUrl)
                .imageType("vehicle")
                .imageTitle(vehicleImgTitle).build());

        ImageEntity plateImg = imgRepo.save(ImageEntity.builder()
                .logEntity(savedLog)
                .imageUrl(plateImgUrl)
                .imageType("plate")
                .imageTitle(plateImgTitle).build());

        // PredictLog 엔티티 저장
        for (int i = 0; i < predList.size(); i++) {
            PredictDto dto = predList.get(i);
            dto.setLogId(savedLog.getLogId());
            PredictLogEntity predEntity = predRepo.save(PredictLogEntity.builder()
                    .logEntity(savedLog)
                    .modelType(dto.getModelType())
                    .isPresent(dto.isPresent())
                    .accuracy(dto.getAccuracy())
                    .predictedText(dto.getPredictedText()).build());
        }

        // logDto 구성
        LogDto dto = LogDto.builder()
                .logId(savedLog.getLogId())
                .vehicleImage(vehicleImg.getImageUrl())
                .plateImage(plateImg.getImageUrl())
                .state(savedLog.getState())
                .date(savedLog.getDate())
                .modelType(savedLog.getModelType())
                .licensePlate(savedLog.getLicensePlate())
                .accuracy(savedLog.getAccuracy() == 0.0 ? "-" : String.valueOf(savedLog.getAccuracy()))
                .build();

        dtos[0] = dto;
        dtos[1] = predList;
        return response.success(dtos);
    }

    // LogEntity & ImageEntity -> LogDto
    private List<LogDto> createLogDto(List<LogEntity> logEntities) {
        List<LogDto> list = new ArrayList<>();
        for (LogEntity logEntity : logEntities) {
            List<ImageEntity> imgEntities = imgRepo.findByLogId(logEntity.getLogId());
            String vehicleImg = imgEntities.get(0).getImageType().equals("vehicle") ? imgEntities.get(0).getImageUrl()
                    : imgEntities.get(1).getImageUrl();
            String plateImg = imgEntities.get(0).getImageType().equals("plate") ? imgEntities.get(0).getImageUrl()
                    : imgEntities.get(1).getImageUrl();

            list.add(LogDto.builder()
                    .logId(logEntity.getLogId())
                    .modelType(logEntity.getModelType())
                    .vehicleImage(vehicleImg)
                    .plateImage(plateImg)
                    .state(logEntity.getState())
                    .date(logEntity.getDate())
                    .licensePlate(logEntity.getLicensePlate())
                    .accuracy(logEntity.getAccuracy() == 0.0 ? "-" : String.valueOf(logEntity.getAccuracy()))
                    .build());
        }
        return list;
    }

    public ResponseEntity<?> searchDate(String start, String end) throws ParseException {

        // String -> Date 변환
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = dateFormat.parse(start);
        Date endDate = dateFormat.parse(end);
        System.out.printf("%s ~ %s", startDate, endDate);

        // 로그 조회
        List<LogEntity> logEntities = logRepo.findByDate(startDate, endDate);
        System.out.println("logEntities : " + logEntities);

        // LogEntity -> LogDto 변환
        List<LogDto> list = createLogDto(logEntities);

        return response.success(list);
    }

    public ResponseEntity<?> searchPlate(String plate) {

        // 로그 조회
        List<LogEntity> logEntities = logRepo.findByPlate(plate);

        // LogEntity -> LogDto 변환
        List<LogDto> list = createLogDto(logEntities);

        return response.success(list);
    }

    public ResponseEntity<?> getHistory() {
        List<HistoryEntity> entities = histRepo.findAll();
        List<HistoryDto> list = new ArrayList<>();
        for (HistoryEntity entity : entities) {
            list.add(HistoryDto.builder()
                    .id(entity.getId())
                    .logId(entity.getLogId())
                    .userId(entity.getUserId())
                    .workType(entity.getWorkType())
                    .currentText(entity.getCurrentText())
                    .previousText(entity.getPreviousText())
                    .date(entity.getDate())
                    .build());
        }
        return response.success(list);
    }

    public ResponseEntity<?> updateLog(ArrayList<LogDto> list, String userId) throws IOException {
        for (LogDto dto : list) {
            Optional<LogEntity> optionalLog = logRepo.findById(dto.getLogId());
            if (!optionalLog.isPresent()) {
                return response.fail("수정 실패", HttpStatus.BAD_REQUEST);
            }

            LogEntity entity = optionalLog.get();

            // history 기록
            histRepo.save(HistoryEntity.builder()
                    .logId(dto.getLogId())
                    .previousText(entity.getLicensePlate())
                    .currentText(dto.getLicensePlate())
                    .workType("update")
                    .userId("admin").build());

            // 수정된 log 기록
            entity.setLicensePlate(dto.getLicensePlate());
            entity.setState("수정 완료");

            logRepo.save(entity);

            dto.setState("수정 완료");
            // AWS S3 파일 이동
            List<ImageEntity> imgEntities = imgRepo.findByLogId(entity.getLogId());
            String vehicleImgTitle = imgEntities.get(0).getImageTitle();
            String plateImgTitle = imgEntities.get(1).getImageTitle();

            try {
                Map<String, String> urlMap = fileService.moveFile(vehicleImgTitle, plateImgTitle);
                ImageEntity vehicleEntity = imgEntities.get(0);
                ImageEntity plateEntity = imgEntities.get(1);

                // image_url 수정
                vehicleEntity.setImageUrl(urlMap.get("vehicle"));
                imgRepo.save(vehicleEntity);
                plateEntity.setImageUrl(urlMap.get("plate"));
                imgRepo.save(plateEntity);

                // AWS S3 파일 삭제
                fileService.deleteFile(vehicleImgTitle, plateImgTitle);
            } catch (Exception e) {
                e.printStackTrace();
                continue;
            }
        }
        return response.success();
    }

    public ResponseEntity<?> deleteLog(ArrayList<LogDto> list, String userId) {
        try {
            for (LogDto dto : list) {
                int logId = dto.getLogId();
                System.out.println("logId : " + logId);

                // AWS S3 파일 삭제
                List<ImageEntity> imgEntity = imgRepo.findByLogId(logId);
                System.out.println("imgEntity : " + imgEntity.toString());
                String vehicleImgTitle = imgEntity.get(0).getImageTitle();
                String plateImgTitle = imgEntity.get(1).getImageTitle();
                fileService.deleteFile(vehicleImgTitle, plateImgTitle);

                // log 삭제
                logRepo.deleteById(logId);

                // history 기록
                histRepo.save(HistoryEntity.builder()
                        .logId(dto.getLogId())
                        .previousText("delete")
                        .currentText("delete")
                        .workType("delete")
                        .userId(userId).build());
            }
            return response.success();
        } catch (Exception e) {
            e.printStackTrace();
            return response.fail("삭제 실패", HttpStatus.BAD_REQUEST);
        }
    }
}
