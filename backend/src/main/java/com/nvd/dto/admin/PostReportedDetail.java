package com.nvd.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostReportedDetail {
    int post_id;
    String content;
    String product;
    String date_post;

    public List<PostImagesDetail> listPostImages;

    String user_email;
    String user_fullname;
    String user_avatar;
    int total_report;
}
