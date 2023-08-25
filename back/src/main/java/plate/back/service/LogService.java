package plate.back.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import plate.back.dto.LogDto;
import plate.back.persistence.CarInfoRepository;
import plate.back.persistence.LogRepository;
import plate.back.persistence.PredictLogRepository;

@Service
public class LogService {
    @Autowired
    CarInfoRepository carRepo;

    @Autowired
    LogRepository logRepo;

    @Autowired
    PredictLogRepository predRepo;

    @Autowired
    FileService fileService;

    @Autowired
    FlaskService flaskService;

    public List<LogDto> recordLog(MultipartFile file) throws IOException {
        // file 업로드(Aws S3)
        // String url = fileService.uploadFile(file);
        String url = "Image URL";
        // flask api 호출 -> predRepo.save() -> logRepo.save()
        String predictValue = flaskService.callApi(file).getBody();

        // ObjectMapper objectMapper = new ObjectMapper();
        // HashMap<String, Object> predictionMap = objectMapper.readValue(predictValue,
        // new TypeReference<HashMap<String, Object>>() {
        // });

        System.out.println("predictValue : " + predictValue);
        // logRepo.save(LogEntity.builder()
        // .ImageDir(url)
        // .licensePlate("14가 1234")
        // .accuracy(60.0).build());
        // logDto 구성
        List<LogDto> list = new ArrayList<>(Arrays.asList(LogDto.builder().image(url).build()));

        return list;
    }

    public List<LogDto> searchLog(Date start, Date end) {
        List<LogDto> list = new ArrayList<>();

        return list;
    }

    public List<LogDto> updateLog(LogDto dto) {

        List<LogDto> list = new ArrayList<>();

        return list;
    }

    public List<Boolean> deleteLog(List<LogDto> list) {
        for (LogDto dto : list) {
            logRepo.deleteById(dto.getLogId());
        }
        return new ArrayList<Boolean>(Arrays.asList(true));
    }
}
