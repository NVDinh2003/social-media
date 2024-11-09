package com.nvd.dto.request.message;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageReactDTO {

    private ApplicationUser user;
    private Message message;
    private String reaction;
}
