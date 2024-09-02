package com.nvd.dto;

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
