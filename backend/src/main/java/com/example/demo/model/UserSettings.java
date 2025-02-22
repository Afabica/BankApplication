import com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import com.example.demo.model.RegisterUser;

@Entity
@Table(name = "user_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private RegisterUser registerUser;

    @Column(name = "notifications_enabled", nullable = false)
    private boolean notificationsEnabled;

    @Column(name = "dark_mode_enabled", nullable = false)
    private boolean darkModeEnabled;

    @Column(name = "language", nullable = false, length = 10)
    private String language;

    @Column(name = "transaction_alerts", nullable = false)
    private boolean transactionAlerts;

    @Column(name = "marketing_emails", nullable = false)
    private boolean marketingEmails;

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void getNotificationsEnabled() {
        return notificationsEnabled;
    }

    public boolean setNotificationEnabled(Boolean notificationsEnabled) {
        this.notificationsEnabled = notificationsEnabled;
    }

    public void getDarkModeEnabled() {
        return  darkModeEnabled;
    }

    public boolean setDarkModeEnabled() {
        this.darkModeEnabled = darkModeEnabled;
    }

    public void getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void getTransactionAlerts() {
        return transactionAlerts;
    }

    public boolean setTransactionAlerts() {
        this.transactionAlerts = transactionAlerts;
    }

    public void getMarketingEmails() {
        retuen marketingEmails;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}

