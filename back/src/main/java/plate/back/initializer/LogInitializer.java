package plate.back.initializer;
// package plate.back;

// import java.time.LocalDateTime;
// import java.time.ZoneId;
// import java.time.temporal.ChronoUnit;
// import java.util.Date;
// import java.util.Random;

// import org.springframework.boot.ApplicationArguments;
// import org.springframework.boot.ApplicationRunner;
// import org.springframework.stereotype.Component;

// import lombok.RequiredArgsConstructor;
// import plate.back.entity.ImageEntity;
// import plate.back.entity.LogEntity;
// import plate.back.entity.PredictLogEntity;
// import plate.back.persistence.ImageRepository;
// import plate.back.persistence.LogRepository;
// import plate.back.persistence.PredictLogRepository;

// @RequiredArgsConstructor
// @Component
// public class LogInitializer implements ApplicationRunner {

// private final LogRepository logRepo;
// private final PredictLogRepository predRepo;
// private final ImageRepository imgRepo;

// @Override
// public void run(ApplicationArguments args) throws Exception {
// for (int num = 0; num < 100; num++) {
// Random random = new Random();

// LocalDateTime now = LocalDateTime.now();
// LocalDateTime lastYear = now.minus(1, ChronoUnit.YEARS);
// long daysBetween = ChronoUnit.DAYS.between(lastYear, now);
// int randomNum = random.nextInt((int) daysBetween);
// LocalDateTime randomTime = lastYear.plus(randomNum, ChronoUnit.DAYS);
// Date randomDate =
// Date.from(randomTime.atZone(ZoneId.systemDefault()).toInstant());

// int[] randomText = { 1063, 2580, 2591, 3231, 4365, 5061, 6214, 7136, 7979,
// 8080 };
// String[] stateArr = { "수정 필요", "수정 불필요" };

// LogEntity log = logRepo.save(LogEntity.builder()
// .date(randomDate)
// .licensePlate(String.valueOf(randomText[random.nextInt(10)]))
// .accuracy((double) random.nextInt(100))
// .state(stateArr[random.nextInt(2)])
// .build());
// String[] modelTypes = new String[] { "ocr", "vgg", "robo" };
// for (int i = 0; i < 3; i++) {
// predRepo.save(PredictLogEntity.builder()
// .modelType(modelTypes[i])
// .logEntity(log)
// .predictedText(i == 0 ? log.getLicensePlate() :
// String.valueOf(random.nextInt(10000)))
// .accuracy((double) random.nextInt(100))
// .isPresent(random.nextInt(2) == 1 ? true : false)
// .build());
// }

// for (int i = 0; i < 2; i++) {
// imgRepo.save(ImageEntity.builder()
// .logEntity(log)
// .imageTitle(i == 0 ? "Vehicle" : "Plate")
// .imageUrl(i == 0 ?
// "https://avatars.githubusercontent.com/u/98063854?s=40&v=4"
// : "https://avatars.githubusercontent.com/u/129818813?v=4")
// .imageType(i == 0 ? "vehicle" : "plate")
// .build());
// }
// }
// }
// }