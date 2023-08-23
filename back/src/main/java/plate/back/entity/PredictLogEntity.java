package plate.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Entity
@Table(name = "predict_log")
public class PredictLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "logId", referencedColumnName = "logId", nullable = false)
    private LogEntity logId;
    @Column(nullable = false, length = 20)
    private String predictedColor;
    @Column(nullable = false, length = 20)
    private String predictedType;
    @Column(nullable = false, length = 20)
    private String predictedText;
    @Column(nullable = false)
    private Double accuracy;
    @Column(nullable = false)
    private boolean isPresent;
}