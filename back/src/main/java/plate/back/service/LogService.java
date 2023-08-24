package plate.back.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    public List<LogDto> recordLog(MultipartFile file) {
        // file 업로드(GCS) -> logRepo.save()
        // flask api 호출 -> predRepo.save()
        // logDto 구성
        List<LogDto> list = new ArrayList<>();

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
