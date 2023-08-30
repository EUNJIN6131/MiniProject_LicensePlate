package plate.back.service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import plate.back.dto.HistoryDto;
import plate.back.dto.LogDto;
import plate.back.dto.PredictDto;
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

    public List<LogDto> recordLog(MultipartFile file) throws IOException {

        // flask api 호출
        LinkedHashMap<String, Object> response = (LinkedHashMap<String, Object>) flaskService.callApi(file).getBody();
        System.out.println("Response : " + response.entrySet());

        ArrayList<ArrayList<Object>> predictValue = (ArrayList<ArrayList<Object>>) response.get("predictedResults");
        ArrayList<PredictDto> predList = new ArrayList<>();
        for (ArrayList<Object> obj : predictValue) {
            predList.add(new PredictDto(String.valueOf(obj.get(0)), (double) obj.get(1)));
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
                    .licensePlate(predList.get(idx).getPredictedText())
                    .accuracy(maxVal)
                    .state("수정 불필요")
                    .date(new Date()).build());
        } else {
            savedLog = logRepo.save(LogEntity.builder()
                    .licensePlate("-")
                    .accuracy(0.0)
                    .state("수정 필요")
                    .date(new Date()).build());
        }

        // Image 엔티티 저장
        // 원본 file 업로드(Aws S3)
        String[] vehicleImgArr = fileService.uploadFile(file, "total/vehicle/");
        String vehicleImgUrl = vehicleImgArr[0];
        String vehicleImgTitle = vehicleImgArr[1];
        String plateImgUrl = String.valueOf(response.get("plateImgUrl"));
        String plateImgTitle = String.valueOf(response.get("plateImgTitle"));

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
            PredictLogEntity predEntity = predRepo.save(PredictLogEntity.builder()
                    .logEntity(savedLog)
                    .isPresent(dto.isPresent())
                    .accuracy(dto.getAccuracy())
                    .predictedText(dto.getPredictedText()).build());
        }

        // logDto 구성
        List<LogDto> list = new ArrayList<>(Arrays.asList(LogDto.builder()
                .logId(savedLog.getLogId())
                .vehicleImage(vehicleImg.getImageUrl())
                .plateImage(plateImg.getImageUrl())
                .state(savedLog.getState())
                .date(savedLog.getDate())
                .licensePlate(savedLog.getLicensePlate())
                .accuracy(savedLog.getAccuracy() == 0.0 ? "-" : String.valueOf(savedLog.getAccuracy()))
                .build()));
        return list;
    }

    // LogEntity, ImageEntity -> LogDto
    private List<LogDto> createLogDto(List<LogEntity> logEntities) {
        List<LogDto> list = new ArrayList<>();
        for (LogEntity logEntity : logEntities) {
            List<ImageEntity> imgEntities = imgRepo.findByLogId(logEntity.getLogId());
            String vehicleImg = imgEntities.get(0).getImageType() == "vehicle" ? imgEntities.get(0).getImageUrl()
                    : imgEntities.get(1).getImageUrl();
            String plateImg = imgEntities.get(0).getImageType() == "plate" ? imgEntities.get(0).getImageUrl()
                    : imgEntities.get(1).getImageUrl();

            list.add(LogDto.builder()
                    .logId(logEntity.getLogId())
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

    public List<LogDto> searchDate(String start, String end) throws ParseException {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = dateFormat.parse(start);
        Date endDate = dateFormat.parse(end);
        System.out.printf("%s ~ %s", startDate, endDate);

        List<LogEntity> logEntities = logRepo.findByDate(startDate, endDate);
        System.out.println("logEntities : " + logEntities);

        List<LogDto> list = createLogDto(logEntities);

        return list;
    }

    public List<LogDto> searchPlate(String plate) {

        List<LogEntity> logEntities = logRepo.findByPlate(plate);
        List<LogDto> list = createLogDto(logEntities);

        return list;
    }

    public List<HistoryDto> getHistory() {
        List<HistoryEntity> entities = histRepo.findAll();
        List<HistoryDto> list = new ArrayList<>();
        for (HistoryEntity entity : entities) {
            list.add(HistoryDto.builder()
                    .logId(entity.getLogId())
                    .userId(entity.getUserId())
                    .workType(entity.getWorkType())
                    .currentText(entity.getCurrentText())
                    .previousText(entity.getPreviousText())
                    .date(entity.getDate())
                    .build());
        }
        return list;
    }

    public List<Boolean> updateLog(LogDto dto) {
        Optional<LogEntity> optionalLog = logRepo.findById(dto.getLogId());
        if (!optionalLog.isPresent()) {
            throw new EntityNotFoundException("LogId not present in the database");
        }

        LogEntity entity = optionalLog.get();

        histRepo.save(HistoryEntity.builder()
                .logId(dto.getLogId())
                .previousText(entity.getLicensePlate())
                .currentText(dto.getLicensePlate())
                .workType("update")
                .userId("admin").build());

        entity.setLicensePlate(dto.getLicensePlate());
        entity.setState("수정 완료");

        logRepo.save(entity);

        return new ArrayList<Boolean>(Arrays.asList(true));
    }

    public List<Boolean> deleteLog(ArrayList<LogDto> list) {
        try {
            for (LogDto dto : list) {
                System.out.println("LogId : " + dto.getLogId());
                logRepo.deleteById(dto.getLogId());

                histRepo.save(HistoryEntity.builder()
                        .logId(dto.getLogId())
                        .previousText("delete")
                        .currentText("delete")
                        .workType("delete")
                        .userId("admin").build());
            }
            return new ArrayList<Boolean>(Arrays.asList(true));
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<Boolean>(Arrays.asList(false));
        }
    }
}
