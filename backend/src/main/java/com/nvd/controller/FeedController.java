package com.nvd.controller;

import com.nvd.dto.FeedRequestDTO;
import com.nvd.dto.response.FetchFeedResponseDTO;
import com.nvd.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feeds")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @PostMapping()
    public FetchFeedResponseDTO getPostsForFeed(@RequestBody FeedRequestDTO feedRequestDTO) {

        return feedService.getFeedForUser
                (feedRequestDTO.getUserId(),
                        feedRequestDTO.getSessionStart(),
                        feedRequestDTO.getPage());

    }
}
