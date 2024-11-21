package com.nvd.dto.request.message;

import com.nvd.models.MessageReaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateReactionDTO {

    private MessageReaction messageReaction;
    private MessageReactionOperation operation;


}
