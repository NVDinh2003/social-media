package com.nvd.dto.response;

import com.nvd.models.ApplicationUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedPostDTO {

    private PostDTO post;
    private PostDTO replyTo;
    private boolean repost;
    private ApplicationUser repostUser;

}
