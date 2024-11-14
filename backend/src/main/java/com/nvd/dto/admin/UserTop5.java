package com.nvd.dto.admin;


import com.nvd.models.ApplicationUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserTop5 {
    private ApplicationUser user;

    private int totalPosts;
    private int totalStars;
}
