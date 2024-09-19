package com.nvd.service;

import com.nvd.dto.response.FeedPostDTO;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final UserService userService;
    private final PostService postService;

    public List<FeedPostDTO> getFeedForUser(Integer userId, LocalDateTime sessionStart, Integer page) {
        ApplicationUser currentUser = userService.getUserById(userId);

        Set<ApplicationUser> following = currentUser.getFollowing();
        following.add(currentUser); // include the current user in the feed as well as their followings

//        Set<Post> currentUserPosts = postService.getAllPostsByAuthor(currentUser);

        Page<Post> followingPosts = postService.getFeedPage(userId, sessionStart, page);
        List<FeedPostDTO> feedPostDTOs = followingPosts.map(post -> {
            FeedPostDTO feedPostDTO = new FeedPostDTO();
            feedPostDTO.setPost(post);
            feedPostDTO.setReplyTo(post.getReply() ? postService.getPostById(post.getReplyTo()) : null);
            feedPostDTO.setRepost(!post.getAuthor().getFollowers().contains(userService.getUserById(userId))
                    && !post.getAuthor().equals(userService.getUserById(userId)));
            feedPostDTO.setRepostUser(
                    feedPostDTO.isRepost() ?
                            post.getReposts().stream().filter(user ->
                                    userService.getUserById(userId).getFollowing().contains(user)
                            ).findFirst().orElse(null)
                            : null);
            return feedPostDTO;
        }).toList();

        // map these to new DTO for the feed itself

//        List<Post> allPosts = new ArrayList<>();
//        allPosts.addAll(currentUserPosts);
//        allPosts.addAll(followingPosts);

        return feedPostDTOs;
    }
}
