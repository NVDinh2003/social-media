package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Poll;
import com.nvd.models.PollChoice;
import com.nvd.repositories.PollChoiceRepository;
import com.nvd.repositories.PollRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class PollService {

    private final PollRepository pollRepository;
    private final PollChoiceRepository pollChoiceRepository;
    private final UserService userService;

    // create all the poll options before they are attached to the post
    public PollChoice generateChoice(PollChoice pc) {
        return pollChoiceRepository.save(pc);
    }

    // create a poll before it gets attached to the post
    public Poll generatePoll(Poll p) {
        return pollRepository.save(p);
    }

    // Place a vote on a poll
    public Poll voteForChoice(Integer choiceId, Integer userId) {
        // grab the user
        ApplicationUser user = userService.getUserById(userId);

        // get the entire poll from the choice
        PollChoice pc = pollChoiceRepository.findById(choiceId).orElseThrow();
        Poll poll = pc.getPoll();

        List<ApplicationUser> votes = new ArrayList<>();
        poll.getChoices().forEach(choice -> {
            choice.getVotes().forEach(voteUser -> {
                votes.add(voteUser);
            });
        });

        // avoid user voting twice, get first vote result
        if (votes.contains(user))
            return poll;

        // update the choice itself
        Set<ApplicationUser> currentVotes = pc.getVotes();
        currentVotes.add(user);
        pc.setVotes(currentVotes);
        pollChoiceRepository.save(pc);

//        log.info(pc.toString());
        List<PollChoice> pcList = poll.getChoices();
        pcList.set(poll.getChoices().indexOf(pc), pc);
        return pollRepository.save(poll);

    }
}
