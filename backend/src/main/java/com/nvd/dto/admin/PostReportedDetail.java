package com.nvd.dto.admin;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostReportedDetail {
    private Integer post_id;
    private String content;
    private LocalDateTime posted_date;
    private ApplicationUser author;
    private List<Image> images;
    private int total_report;
}
