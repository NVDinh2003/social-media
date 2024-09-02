package com.nvd.dto;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Image;
import com.nvd.models.Post;
import com.nvd.models.enums.Audience;
import com.nvd.models.enums.ReplyRestriction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePostDTO {
    private String content;
    private ApplicationUser author;
    Set<Post> replies;
    private List<Image> images;
    private Boolean scheduled;
    private Date scheduledDate;
    private Audience audience;
    private ReplyRestriction replyRestriction;


}
