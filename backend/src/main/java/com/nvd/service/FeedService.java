package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final UserService userService;
    private final PostService postService;

    public List<Post> getFeedForUser(Integer userId, Date sessionStart, Integer page) {
        ApplicationUser currentUser = userService.getUserById(userId);

        Set<ApplicationUser> following = currentUser.getFollowing();
        following.add(currentUser); // include the current user in the feed as well as their followings

        Set<Post> currentUserPosts = postService.getAllPostsByAuthor(currentUser);

        Page<Post> followingPosts = postService.getFeedPage(userId, sessionStart, page);

        // map these to new DTO for the feed itself

//        List<Post> allPosts = new ArrayList<>();
//        allPosts.addAll(currentUserPosts);
//        allPosts.addAll(followingPosts);

        return followingPosts.getContent();
    }
}
