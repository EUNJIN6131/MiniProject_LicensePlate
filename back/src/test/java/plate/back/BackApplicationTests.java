package plate.back;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import plate.back.entity.CarInfoEntity;
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
		// carInfoRepo.save(
		// CarInfoEntity.builder()
		// .color("red")
		// .licensePlate("12나 4980")
		// .driverName("김상식")
		// .build());

		logRepo.save(
				LogEntity.builder().build());

		logRepo.save(
				LogEntity.builder().build());

		predRepo.save(
				PredictLogEntity.builder()
						.predictedText("12나 1234")
						.predictedColor("red")
						.predictedType("Iru")
						.accuracy(63.4)
						.logId(LogEntity.builder().logId(1).build())
						.isPresent(false)
						.build());

		predRepo.save(
				PredictLogEntity.builder()
						.predictedText("12다 1234")
						.predictedColor("blue")
						.predictedType("Iru2")
						.accuracy(93.4)
						.logId(LogEntity.builder().logId(1).build())
						.isPresent(true)
						.build());
	}

	@Test
	void contextLoads1() {
		logRepo.deleteById(1);
	}
}
