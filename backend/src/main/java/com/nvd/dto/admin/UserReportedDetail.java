package com.nvd.dto.admin;


import com.nvd.models.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReportedDetail {

    private Integer user_id;
    private String email;
    private String username;
    private String nickname;
    private Image profile_picture;
    private Boolean verified_account;

    private int total_posts;
    private int total_reported; // số lần bị report
}
