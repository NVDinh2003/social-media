package com.nvd.dto.response;

import com.nvd.models.ApplicationUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDTO {
    private Integer conversationId;
    private List<ApplicationUser> conversationUsers;
    private List<MessageDTO> conversationMessage;
    private String conversationName;
    private String conversationPicture;
}