package plate.back.initializer;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import plate.back.entity.CarInfoEntity;
import plate.back.persistence.CarInfoRepository;

@RequiredArgsConstructor
@Component
public class CarInfoInitializer implements ApplicationRunner {

    private final CarInfoRepository carRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        int[] plate = { 5629, 5381, 8540, 9798, 7570, 7252, 6322, 1459, 5537, 3153, 3502, 1379, 5027, 9816, 8521, 8941,
                4251, 5222, 9516, 2799, 9030, 8056, 3694, 7236, 5044, 3667, 3399, 1221, 7117, 1547, 9183, 9570, 1602,
                7375, 2165, 1892, 9669, 6755, 3319, 4700, 8536, 3013, 7885, 7482, 9135, 2075, 2207, 7822, 4383 };

        for (int text : plate) {
            carRepo.save(CarInfoEntity.builder().licensePlate(String.valueOf(text)).build());
        }
    }
}