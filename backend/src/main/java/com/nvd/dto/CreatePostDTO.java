package com.nvd.dto;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Image;
import com.nvd.models.Poll;
import com.nvd.models.Post;
import com.nvd.models.enums.Audience;
import com.nvd.models.enums.ReplyRestriction;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePostDTO {
    private String content;
    private ApplicationUser author;
    Set<Post> replies;
    private List<Image> images;
    private Boolean scheduled;
    private LocalDateTime scheduledDate;
    private String address;
    private String provinceCode;
    private String districtCode;
    private String wardCode;
    private Audience audience;
    private ReplyRestriction replyRestriction;
    private Poll poll;

}
