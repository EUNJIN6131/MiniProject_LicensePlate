package plate.back.security;

import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenProvider {
    static final long EXPIRATIONTIME = 36000; // 유효시간 설정
    static final String PREFIX = "Bearer ";
    static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 비밀 키 생성
    Instant now = Instant.now();
    Instant expiration = now.plus(Duration.ofSeconds(EXPIRATIONTIME));

    public TokenProvider() {
        // 서명 및 확인에 동일한 키를 사용하는지 확인하기 위해 비밀 키의 base64 인코딩 값을 출력합니다.
        System.out.println("Secret Key: " + Base64.getEncoder().encodeToString(SECRET_KEY.getEncoded()));
    }

    // 서명된 JWT 토큰 생성
    public String createToken(String userId) {
        String token = Jwts.builder().setSubject(userId).setExpiration(Date.from(expiration)).setIssuer("admin")
                .setIssuedAt(new Date()).signWith(SECRET_KEY).compact();
        return token;
    }

    public String validateAndGetUserId(String token) {
        try {
            // parseClaimsJws메서드가 Base 64로 디코딩 및 파싱.
            // 즉, 헤더와 페이로드를 setSigningKey로 넘어온 시크릿을 이용 해 서명 후, token의 서명 과 비교.
            // 위조되지 않았다면 페이로드(Claims) 리턴, 위조라면 예외를 날림
            // 그 중 우리는 userId가 필요하므로 getBody를 부른다.
            token = token.replace(PREFIX, "");
            System.out.println("Received Token: " + token);
            Claims claims = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
            System.out.println("Parsed Claims: " + claims);
            return claims.getSubject();
        } catch (Exception e) {
            System.out.println("예외");
            e.printStackTrace();
            return null;
        }
    }
}
