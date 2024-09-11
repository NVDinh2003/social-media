package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final UserService userService;
    private final PostService postService;

    public List<Post> getFeedForUser(Integer userId) {
        ApplicationUser currentUser = userService.getUserById(userId);

        Set<ApplicationUser> following = currentUser.getFollowing();

        return postService.getAllPostsByAuthors(following);
    }
}
