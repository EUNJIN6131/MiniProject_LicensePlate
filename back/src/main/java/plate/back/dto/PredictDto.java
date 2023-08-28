package plate.back.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
public class PredictDto {
    private String text;
    private double accuracy;
    private boolean isPresent;
    private String predictedImage;
}
