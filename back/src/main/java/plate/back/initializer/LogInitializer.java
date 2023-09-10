package plate.back.initializer;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import plate.back.persistence.LogRepository;

@RequiredArgsConstructor
@Component
public class LogInitializer implements ApplicationRunner {

    private final LogRepository logRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        logRepo.deleteAll();
    }
}