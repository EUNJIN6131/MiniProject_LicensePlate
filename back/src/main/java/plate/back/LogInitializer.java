package plate.back;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import plate.back.entity.LogEntity;
import plate.back.persistence.LogRepository;

@Component
public class LogInitializer implements ApplicationRunner {

    @Autowired
    LogRepository logRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        for (int num = 0; num < 100; num++) {
            Random random = new Random();
            int randomIdx = random.nextInt(10);
            int randomAccuracy = random.nextInt(100);

            LocalDateTime now = LocalDateTime.now();
            LocalDateTime lastYear = now.minus(1, ChronoUnit.YEARS);
            long daysBetween = ChronoUnit.DAYS.between(lastYear, now);
            int randomNum = random.nextInt((int) daysBetween);
            LocalDateTime randomTime = lastYear.plus(randomNum, ChronoUnit.DAYS);
            Date randomDate = Date.from(randomTime.atZone(ZoneId.systemDefault()).toInstant());

            int[] randomText = { 1063, 2580, 2591, 3231, 4365, 5061, 6214, 7136, 7979,
                    8080 };

            logRepo.save(LogEntity.builder()
                    .originalImage("Original Image")
                    .predictedImage("Predicted Image")
                    .date(randomDate)
                    .licensePlate(String.valueOf(randomText[randomIdx]))
                    .accuracy((double) randomAccuracy)
                    .isPresent(true)
                    .isUpdated(false)
                    .build());
        }
    }
}