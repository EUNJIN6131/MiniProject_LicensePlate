package plate.back.persistence;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import plate.back.entity.LogEntity;

public interface LogRepository extends JpaRepository<LogEntity, Integer> {

    @Query("SELECT log FROM LogEntity log WHERE log.licensePlate = :plate")
    ArrayList<LogEntity> findByPlate(@Param("plate") String plate);
}