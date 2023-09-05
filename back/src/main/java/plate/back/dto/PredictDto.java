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
    private String modelType;
    private String predictedText;
    private double accuracy;
    private boolean isPresent;

    public PredictDto(String modelType, String predictedText, double accuracy) {
        this.modelType = modelType;
        this.predictedText = predictedText;
        this.accuracy = accuracy;
    }
}
