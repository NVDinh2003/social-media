package com.nvd.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReplyPostDTO {
    private PostDTO post;
    private PostDTO replyTo;
}
