package plate.back.entity;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@EntityListeners(AuditingEntityListener.class)
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

    @Column(nullable = false)
    private String originalImage;

    @Column(nullable = false)
    private String predictedImage;

    @Column(nullable = false)
    private boolean isPresent;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isUpdated;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yy-MM-dd HH:mm:ss", timezone = "UTC")
    private Date date;

    @OneToMany(mappedBy = "logEntity", cascade = CascadeType.REMOVE)
    List<PredictLogEntity> predList;

    @OneToMany(mappedBy = "logEntity", cascade = CascadeType.REMOVE)
    List<HistoryEntity> updateList;
}