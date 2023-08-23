package plate.back.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import plate.back.entity.LogEntity;

public interface LogRepository extends JpaRepository<LogEntity, Integer> {
}
