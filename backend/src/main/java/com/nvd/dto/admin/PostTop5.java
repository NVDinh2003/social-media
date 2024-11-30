package com.nvd.dto.admin;

import com.nvd.models.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostTop5 {

    private Post post;

    private int totalStars;
    private int totalLikes;
}
