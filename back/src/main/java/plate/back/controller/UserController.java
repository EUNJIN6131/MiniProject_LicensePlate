package plate.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import plate.back.dto.UserDto;

@RestController
public class UserController {

    // @Autowired
    // UserService userService;

    // @Autowired
    // TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/user/signup")
    public ResponseEntity<?> signUp(UserDto dto) {

        return ResponseEntity.ok().body("temp");
    }

    @PostMapping("/user/signin")
    public ResponseEntity<?> signIn(UserDto dto) {
        return ResponseEntity.ok().body("temp");
    }
}