package com.nvd.dto.response;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedPostDTO {

    private Post post;
    private Post replyTo;
    private boolean repost;
    private ApplicationUser repostUser;
}
