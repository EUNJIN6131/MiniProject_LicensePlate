package plate.back.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class UserResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TokenInfo {
        private String accessToken;
        private String refreshToken;
        private Long refreshTokenExpirationTime;

        public void setRefreshToken(String text) {
            refreshToken = text;
        }
    }
}
