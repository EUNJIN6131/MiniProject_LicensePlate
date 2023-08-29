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
    private Integer logId;
    private String predictedText;
    private double accuracy;
    private boolean isPresent;

    public PredictDto(String predictedText, double accuracy) {
        this.predictedText = predictedText;
        this.accuracy = accuracy;
    }
}
