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
    private String access;
    private Double accuracy;
    private Byte[] image;
    private String state;
}
