package com.nvd.controller;

import com.nvd.dto.FeedRequestDTO;
import com.nvd.dto.response.FeedPostDTO;
import com.nvd.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/feeds")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @PostMapping()
    public List<FeedPostDTO> getPostsForFeed(@RequestBody FeedRequestDTO feedRequestDTO) {

        List<FeedPostDTO> feedPosts = feedService.getFeedForUser
                (feedRequestDTO.getUserId(),
                        feedRequestDTO.getSessionStart(),
                        feedRequestDTO.getPage());

//        Collections.sort(feedPosts);

        return feedPosts;
    }
}
