package plate.back.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import plate.back.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
}