package plate.back.entity;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
// @EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "log")
public class LogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer logId;

    @Column(nullable = false, length = 20)
    private String licensePlate;

    @Column(nullable = false)
    private Double accuracy;

    @Column(nullable = false, length = 20)
    private String state;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date date;

    // @OneToMany(mappedBy = "logEntity", cascade = CascadeType.REMOVE,
    // orphanRemoval = true)
    // Set<PredictLogEntity> predList;

    // @OneToMany(mappedBy = "logEntity", cascade = CascadeType.REMOVE,
    // orphanRemoval = true)
    // Set<HistoryEntity> historyList;

    // @OneToMany(mappedBy = "logEntity", cascade = CascadeType.REMOVE,
    // orphanRemoval = true)
    // Set<ImageEntity> imageList;
}
