package plate.back.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import plate.back.entity.CarInfoEntity;

public interface CarInfoRepository extends JpaRepository<CarInfoEntity, String> {
}
