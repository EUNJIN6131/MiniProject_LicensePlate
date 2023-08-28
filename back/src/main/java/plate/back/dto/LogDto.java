package plate.back.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LogDto {
    private Integer logId;
    private String licensePlate;
    private Date date;
    private String accuracy;
    private String originalImage;
    private String predictedImage;
    private Boolean isPresent;
    private Boolean isUpdated;
}
