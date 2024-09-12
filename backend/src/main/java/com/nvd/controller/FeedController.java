package com.nvd.controller;

import com.nvd.models.Post;
import com.nvd.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/feeds")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @GetMapping("/{userId}")
    public List<Post> getPostsForFeed(@PathVariable("userId") Integer userId) {
        List<Post> feedPosts = feedService.getFeedForUser(userId);
        Collections.sort(feedPosts);

        return feedPosts;
    }
}
