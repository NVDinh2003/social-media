package com.nvd.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PollVoteDTO {
    private Integer choiceId;
    private Integer userId;
}
