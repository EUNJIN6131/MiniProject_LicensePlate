package plate.back.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import plate.back.dto.UserDto;
import plate.back.entity.UserEntity;
import plate.back.persistence.UserRepository;

@RequiredArgsConstructor
@Service
public class UserService {
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final UserRepository userRepo;

    public boolean signUp(UserDto dto) {
        Optional<UserEntity> option = userRepo.findById(dto.getUserId());
        if (option.isPresent()) {
            return false;
        }

        String encodedPassword = passwordEncoder.encode(dto.getPassword());

        userRepo.save(UserEntity.builder()
                .userId(dto.getUserId())
                .password(encodedPassword)
                .name(dto.getName())
                .role("Member")
                .build());

        return true;
    }

    public boolean signIn(UserDto userDto) {

        Optional<UserEntity> option = userRepo.findById(userDto.getUserId());
        if (option.isPresent()) {
            UserEntity member1 = option.get();
            if (passwordEncoder.matches(userDto.getPassword(), member1.getPassword())) {
                return true;
            }
        }
        return false;
    }
}
