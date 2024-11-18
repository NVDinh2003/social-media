package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Calendar;

@Data
@Entity
@Table(name = "user_reported")
@NoArgsConstructor
@AllArgsConstructor
public class UserReported {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_reported_id")
    private ApplicationUser reportedUser;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_send_report_id")
    private ApplicationUser userSendReport;

    private String contentReport;

    @Temporal(TemporalType.DATE)
    private Calendar dateReport = Calendar.getInstance();
}