package com.nvd.dto.request;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Image;
import com.nvd.models.Poll;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateReplyDTO {
    private ApplicationUser author;
    private Integer originalPost;
    private String replyContent;
    private List<Image> images;
    private Boolean scheduled;
    private LocalDateTime scheduledDate;
    private Poll poll;

}
