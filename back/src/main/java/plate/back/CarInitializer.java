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
// for (int num = 0; num < 1000; num++) {
// Random random = new Random();
// int randomNumber = random.nextInt(10000);
// String text = String.valueOf(randomNumber);
// int len = text.length();
// for (int i = 0; i < 4 - len; i++) {
// text = "0" + text;
// }
// carRepo.save(CarInfoEntity.builder().licensePlate(text).build());
// }
// }
// }