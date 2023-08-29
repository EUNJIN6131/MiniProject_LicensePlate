package plate.back.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityNotFoundException;
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

@Service
public class LogService {
    @Autowired
    CarInfoRepository carRepo;

    @Autowired
    LogRepository logRepo;

    @Autowired
    ImageRepository imgRepo;

    @Autowired
    PredictLogRepository predRepo;

    @Autowired
    HistoryRepository histRepo;

    @Autowired
    FileService fileService;

    @Autowired
    FlaskService flaskService;

    public List<LogDto> recordLog(MultipartFile file) throws IOException {
        // 원본 file 업로드(Aws S3)
        String originalUrl = fileService.uploadFile(file, "origin/vehicle/");

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
        String predictedImage = String.valueOf(response.get("predictedImage"));

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
        imgRepo.save(ImageEntity.builder()
                .logEntity(savedLog)
                .vehicleImageUrl(predictedImage)
                .plateImageUrl(predictedImage).build());

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
                .originalImage(savedLog.getOriginalImage())
                .predictedImage(savedLog.getPredictedImage())
                .date(savedLog.getDate())
                .licensePlate(savedLog.getLicensePlate())
                .accuracy(savedLog.getAccuracy() == 0.0 ? "-" : String.valueOf(savedLog.getAccuracy()))
                .isPresent(savedLog.isPresent())
                .isUpdated(savedLog.isUpdated())
                .build()));
        return list;
    }

    public List<LogDto> searchDate(Date start, Date end) {
        List<LogDto> list = new ArrayList<>();

        return list;
    }

    public List<LogDto> searchPlate(String plate) {
        List<LogEntity> entities = logRepo.findByPlate(plate);
        List<LogDto> list = new ArrayList<>();
        for (LogEntity logEntity : entities) {
            list.add(LogDto.builder().logId(logEntity.getLogId())
                    .originalImage(logEntity.getOriginalImage())
                    .predictedImage(logEntity.getPredictedImage())
                    .date(logEntity.getDate())
                    .licensePlate(logEntity.getLicensePlate())
                    .accuracy(logEntity.getAccuracy() == 0.0 ? "-" : String.valueOf(logEntity.getAccuracy()))
                    .isPresent(logEntity.isPresent())
                    .isUpdated(logEntity.isUpdated())
                    .build());
        }
        return list;
    }

    public List<HistoryDto> getHistory() {
        List<HistoryEntity> entities = histRepo.findAll();
        List<HistoryDto> list = new ArrayList<>();
        for (HistoryEntity entity : entities) {
            list.add(HistoryDto.builder()
                    .logId(entity.getLogEntity().getLogId())
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
        entity.setLicensePlate(dto.getLicensePlate());
        entity.setUpdated(true);

        logRepo.save(entity);

        return new ArrayList<Boolean>(Arrays.asList(true));
    }

    public List<Boolean> deleteLog(List<LogDto> list) {
        for (LogDto dto : list) {
            logRepo.deleteById(dto.getLogId());
        }
        return new ArrayList<Boolean>(Arrays.asList(true));
    }
}
