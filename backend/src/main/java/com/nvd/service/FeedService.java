package com.nvd.service;

import com.nvd.dto.response.FeedPostDTO;
import com.nvd.dto.response.FetchFeedResponseDTO;
import com.nvd.mappers.PostMapper;
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
    private final PostMapper postMapper;

    public FetchFeedResponseDTO getFeedForUser(Integer userId, LocalDateTime sessionStart, Integer page) {
        ApplicationUser currentUser = userService.getUserById(userId);

        Set<ApplicationUser> following = currentUser.getFollowing();
        if (!following.contains(currentUser)) {
            following.add(currentUser); // include the current user in the feed as well as their followings
        }

        // lấy các posts của user hiện tại và các posts của các user mà họ đang theo dõi
        Page<Post> followingPosts = postService.getFeedPage(userId, sessionStart, page);
        List<FeedPostDTO> listPosts = followingPosts.map(post -> {
            FeedPostDTO feedPostDTO = new FeedPostDTO();
            feedPostDTO.setPost(postMapper.convertToDTO(post));

            // nếu post này là reply thì sẽ lấy bài post gốc mà nó reply
            feedPostDTO.setReplyTo(post.isReply() ? postService.getPostDTOById(post.getReplyTo()) : null);

            // check user hiện tại có follow author không và check author có là user hiện tại hay không
            // -> true nếu current user không follow author không và author không phải là current user
            feedPostDTO.setRepost(!post.getAuthor().getFollowers().contains(userService.getUserById(userId))
                    && !post.getAuthor().equals(userService.getUserById(userId)));

            feedPostDTO.setRepostUser(
                    // nếu là repost, duyệt qua list user đã repost bài post này, lọc và tìm user đầu tiên mà current user đang theo dõi
                    feedPostDTO.isRepost() ?
                            post.getReposts().stream().filter(user ->
                                    userService.getUserById(userId).getFollowing().contains(user)
                            ).findFirst().orElse(null)
                            : null);
            return feedPostDTO;
        }).toList();

        return new FetchFeedResponseDTO(page, sessionStart, listPosts);
    }

}
