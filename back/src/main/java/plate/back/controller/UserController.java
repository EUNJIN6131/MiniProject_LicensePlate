package plate.back.controller;

import java.util.Arrays;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import plate.back.dto.ResponseDto;
import plate.back.dto.UserDto;
import plate.back.security.TokenProvider;
import plate.back.service.UserService;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    private final TokenProvider tokenProvider;

    @PostMapping("/user/signup")
    public ResponseEntity<?> signUp(@RequestBody UserDto dto) {
        try {
            boolean success = userService.signUp(dto);
            System.out.println("success : " + success);
            if (success) {
                ResponseDto<String> response = ResponseDto.<String>builder()
                        .data(Arrays.asList("회원가입 성공")).build();
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                ResponseDto<String> response = ResponseDto.<String>builder()
                        .data(Arrays.asList("아이디 중복")).build();
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDto<String> response = ResponseDto.<String>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/user/signin")
    public ResponseEntity<?> signIn(@RequestBody UserDto userDto) {

        if (userService.signIn(userDto)) {
            System.out.println("로그인 성공");
            // 토큰 생성
            String jwts = tokenProvider.createToken(userDto.getUserId());
            System.out.println("jwts:" + jwts);
            // 생성된 토큰으로 응답을 생성
            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts).build();
        } else {
            System.out.println("로그인 실패");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}