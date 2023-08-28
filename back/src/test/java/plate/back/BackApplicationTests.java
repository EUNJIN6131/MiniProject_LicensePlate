package plate.back;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import plate.back.entity.LogEntity;
import plate.back.entity.PredictLogEntity;
import plate.back.persistence.CarInfoRepository;
import plate.back.persistence.LogRepository;
import plate.back.persistence.PredictLogRepository;

@SpringBootTest
class BackApplicationTests {

    @Autowired
    CarInfoRepository carInfoRepo;
    @Autowired
    LogRepository logRepo;
    @Autowired
    PredictLogRepository predRepo;

    @Test
    void contextLoads() {

    }

    @Test
    void contextLoads1() {
        logRepo.deleteById(2);
    }
}
