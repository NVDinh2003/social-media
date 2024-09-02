package com.nvd.controller;

import com.nvd.dto.PollVoteDTO;
import com.nvd.models.Poll;
import com.nvd.service.PollService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/polls")
@RequiredArgsConstructor
public class PollController {

    private final PollService pollService;

    @PutMapping("/vote")
    public Poll castVote(@RequestBody PollVoteDTO vote) {
        return pollService.voteForChoice(vote.getChoiceId(), vote.getUserId());
    }
}
