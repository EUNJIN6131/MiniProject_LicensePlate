// package plate.back;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import plate.back.entity.LogEntity;
// import plate.back.entity.PredictLogEntity;
// import plate.back.persistence.CarInfoRepository;
// import plate.back.persistence.LogRepository;
// import plate.back.persistence.PredictLogRepository;

// @SpringBootTest
// class BackApplicationTests {

// @Autowired
// CarInfoRepository carInfoRepo;
// @Autowired
// LogRepository logRepo;
// @Autowired
// PredictLogRepository predRepo;

// @Test
// void contextLoads() {
// // carInfoRepo.save(
// // CarInfoEntity.builder()
// // .color("red")
// // .licensePlate("12나 4980")
// // .driverName("김상식")
// // .build());

// LogEntity log1 = logRepo.save(
// LogEntity.builder()
// .ImageDir("asfgasg")
// .ImageTitle("Iru")
// .build());

// LogEntity log2 = logRepo.save(
// LogEntity.builder()
// .ImageDir("asfgasg")
// .ImageTitle("Iru")
// .build());

// for (int i = 0; i < 3; i++) {
// predRepo.save(
// PredictLogEntity.builder()
// .predictedText("12나 1234")
// .predictedColor("red")
// .predictedType("Iru")
// .accuracy(63.4)
// .logEntity(log1)
// .isPresent(false)
// .build());
// }
// for (int i = 0; i < 3; i++) {
// predRepo.save(
// PredictLogEntity.builder()
// .predictedText("12다 1234")
// .predictedColor("blue")
// .predictedType("Iru2")
// .accuracy(93.4)
// .logEntity(log2)
// .isPresent(true)
// .build());
// }
// }

// @Test
// void contextLoads1() {
// logRepo.deleteById(2);
// }
// }
