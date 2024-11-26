package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class JobTicket {
    @Id
    @GeneratedValue
    private Long id;
    private String jobCode;
    private String clientCode;
    private String estimateTime;
    private String progress;
    private String stockNeed;
    private String quantity;
    public JobTicket() {
        // Hibernate requires this constructor for instantiating objects
    }
    public JobTicket(Long id, String jobCode, String clientCode, String estimateTime, String progress, String stockNeed, String quantity) {
        this.id = id;
        this.jobCode = jobCode;
        this.clientCode = clientCode;
        this.estimateTime = estimateTime;
        this.progress = progress;
        this.stockNeed = stockNeed;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobCode() {
        return jobCode;
    }

    public void setJobCode(String jobCode) {
        this.jobCode = jobCode;
    }

    public String getClientCode() {
        return clientCode;
    }

    public void setClientCode(String clientCode) {
        this.clientCode = clientCode;
    }

    public String getEstimateTime() {
        return estimateTime;
    }

    public void setEstimateTime(String estimateTime) {
        this.estimateTime = estimateTime;
    }

    public String getProgress() {
        return progress;
    }

    public void setProgress(String progress) {
        this.progress = progress;
    }

    public String getStockNeed() {
        return stockNeed;
    }

    public void setStockNeed(String stockNeed) {
        this.stockNeed = stockNeed;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
