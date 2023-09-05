// package plate.back;

// import java.util.Random;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.ApplicationArguments;
// import org.springframework.boot.ApplicationRunner;
// import org.springframework.stereotype.Component;

// import plate.back.entity.CarInfoEntity;
// import plate.back.persistence.CarInfoRepository;

// @Component
// public class CarInitializer implements ApplicationRunner {

// @Autowired
// CarInfoRepository carRepo;

// @Override
// public void run(ApplicationArguments args) throws Exception {
// int[] plate = { 1067, 1211, 1221, 1379, 1426, 1446, 1459, 1602, 1892, 1932,
// 2075, 2207, 2225, 2689, 2799, 2997,
// 3013, 3028, 3153, 3214, 3275, 3319, 3399, 3667, 3694, 4251, 4383, 4521, 4524,
// 4562, 4700, 4754, 4984,
// 5007, 5027, 5044, 5537, 5803, 5942, 6322, 6755, 6806, 6868, 7236, 7252, 7310,
// 7570, 7822, 7885, 8056,
// 8521, 8536, 8540, 8609, 8905, 8941, 9030, 9135, 9196, 9256, 9432, 9570, 9669,
// 9695 };
// for (int text : plate) {
// carRepo.save(CarInfoEntity.builder().licensePlate(String.valueOf(text)).build());
// }
// for (int num = 0; num < 1000; num++) {
// Random random = new Random();
// int randomNumber = random.nextInt(10000);
// String text = String.valueOf(randomNumber);
// int len = text.length();
// for (int i = 0; i < 4 - len; i++) {
// text = "0" + text;
// }
// if(text)
// carRepo.save(CarInfoEntity.builder().licensePlate(text).build());
// }
// }
// }