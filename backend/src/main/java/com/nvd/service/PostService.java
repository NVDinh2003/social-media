package com.nvd.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvd.dto.CreatePostDTO;
import com.nvd.dto.CreateReplyDTO;
import com.nvd.exceptions.PostDoesNotExistException;
import com.nvd.exceptions.UnableToCreatePostException;
import com.nvd.models.*;
import com.nvd.models.enums.Audience;
import com.nvd.models.enums.ReplyRestriction;
import com.nvd.repositories.PostRepository;
import com.nvd.utils.Constants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final ImageService imageService;
    private final PollService pollService;
    private final TokenService tokenService;
    private final UserService userService;
    protected final NotificationService notificationService;

    public Post createPost(CreatePostDTO dto) {

        Image savedGif;

        // if true, there is a single gif from tenor
        if (dto.getImages() != null && dto.getImages().size() > 0) {
            List<Image> gifList = dto.getImages();
            Image gif = gifList.get(0);
            gif.setImagePath(gif.getImageURL());

            savedGif = imageService.saveGifFromPost(gif);
            gifList.remove(0);
            gifList.add(savedGif);
            dto.setImages(gifList);
        }

        // If true, there is a Poll that needs to be created
        Poll savedPoll = null;
        if (dto.getPoll() != null) {
            log.info("There was a poll in this post!");
            Poll p = new Poll();
            p.setEndTime(dto.getPoll().getEndTime());
            p.setChoices(new ArrayList<>());
            savedPoll = pollService.generatePoll(p);
            List<PollChoice> pollChoices = new ArrayList<PollChoice>();
            List<PollChoice> choices = dto.getPoll().getChoices();
            for (int i = 0; i < choices.size(); i++) {
                PollChoice choice = choices.get(i);
                choice.setPoll(savedPoll);
                choice = pollService.generateChoice(choice);
                pollChoices.add(choice);
            }

            savedPoll.setChoices(pollChoices);
            savedPoll = pollService.generatePoll(savedPoll);

            log.info(savedPoll.toString());
        }

        Post post = new Post();
        post.setContent(dto.getContent());
        if (dto.getScheduled())
            post.setPostedDate(dto.getScheduledDate());
        else
            post.setPostedDate(LocalDateTime.now());

        post.setAuthor(dto.getAuthor());
        post.setReplies(dto.getReplies());
        post.setScheduled(dto.getScheduled());
        post.setScheduledDate(dto.getScheduledDate());
        post.setAudience(dto.getAudience());
        post.setReplyRestriction(dto.getReplyRestriction());
        post.setImages(dto.getImages());
        post.setPoll(savedPoll);

        try {
            Post posted = postRepository.save(post);
            notificationService.createAndSendPostNotifications(posted);
            return posted;
        } catch (Exception e) {
            //TODO: setup custom exception
            throw new UnableToCreatePostException();
        }
    }

    public Post createMediaPost(String post, List<MultipartFile> files) {
        CreatePostDTO dto = new CreatePostDTO();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            dto = objectMapper.readValue(post, CreatePostDTO.class);

            Post p = new Post();
            p.setContent(dto.getContent());
            if (dto.getScheduled())
                p.setPostedDate(dto.getScheduledDate());
            else
                p.setPostedDate(LocalDateTime.now());

            p.setAuthor(dto.getAuthor());
            p.setReplies(dto.getReplies());
            p.setScheduled(dto.getScheduled());
            p.setScheduledDate(dto.getScheduledDate());
            p.setAudience(dto.getAudience());
            p.setReplyRestriction(dto.getReplyRestriction());

            //upload the images that got passed
            List<Image> postImages = new ArrayList<>();

            for (int i = 0; i < files.size(); i++) {
                Image postImage = imageService.uploadImage(files.get(i), "post");
                postImages.add(postImage);
            }
            p.setImages(postImages);

            return postRepository.save(p);
        } catch (Exception e) {
            throw new UnableToCreatePostException();
        }
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Integer id) {
        //TODO: setup custom exception for post that does not exist
        return postRepository.findById(id).orElseThrow(PostDoesNotExistException::new);
    }

    public Set<Post> getAllPostsByAuthor(ApplicationUser author) {
        Set<Post> posts = postRepository.findByAuthor(author).orElse(new HashSet<>());

        return posts;
    }

//    public Page<Post> getAllPostsByAuthors(Set<ApplicationUser> authors, LocalDateTime sessionStart, Integer page) {
//        // get the next 100 posts starting on specified in the request
//        Pageable pageable = PageRequest.of(page, 100, Sort.by("postedDate").descending());
//
//        return postRepository.findPostsByAuthors(authors, sessionStart, pageable);
//    }

    public Page<Post> getFeedPage(Integer userId, LocalDateTime sessionStart, Integer page) {
        Pageable pageable = PageRequest.of(page, Constants.FETCH_FEED_POST_PAGE_SIZE);

        return postRepository.findFeedPosts(userId, sessionStart, pageable);
    }

    public void deletePostById(int id) {
        postRepository.deleteById(id);
    }

    public Post replyToPost(CreateReplyDTO replyDTO) {
        CreatePostDTO postDTO = CreatePostDTO.builder()
                .content(replyDTO.getReplyContent())
                .author(replyDTO.getAuthor())
                .replies(new HashSet<>())
                .images(replyDTO.getImages())
                .scheduled(replyDTO.getScheduled())
                .scheduledDate(replyDTO.getScheduledDate())
                .audience(Audience.EVERYONE)
                .replyRestriction(ReplyRestriction.EVERYONE)
                .poll(replyDTO.getPoll())
                .build();

        Post reply = createPost(postDTO);
        reply.setReply(true);
        reply.setReplyTo(replyDTO.getOriginalPost());

        Post original = postRepository.findById(replyDTO.getOriginalPost()).orElseThrow(UnableToCreatePostException::new);
        Set<Post> originalPostReplies = original.getReplies();
        originalPostReplies.add(reply);

        original.setReplies(originalPostReplies);

        postRepository.save(original);
        return postRepository.save(reply);
    }

    public Post createReplyWithMedia(String reply, List<MultipartFile> files) {
        CreateReplyDTO dto = new CreateReplyDTO();
        ObjectMapper mapper = new ObjectMapper();

        try {
            dto = mapper.readValue(reply, CreateReplyDTO.class);

            CreatePostDTO postDTO = CreatePostDTO.builder()
                    .content(dto.getReplyContent())
                    .author(dto.getAuthor())
                    .replies(new HashSet<>())
                    .images(dto.getImages())
                    .scheduled(dto.getScheduled())
                    .scheduledDate(dto.getScheduledDate())
                    .audience(Audience.EVERYONE)
                    .replyRestriction(ReplyRestriction.EVERYONE)
                    .poll(dto.getPoll())
                    .build();

            Post replyPost = createPost(postDTO);
            replyPost.setReply(true);
            replyPost.setReplyTo(dto.getOriginalPost());

            Post original = postRepository.findById(dto.getOriginalPost()).orElseThrow(UnableToCreatePostException::new);
            Set<Post> originalPostReplies = original.getReplies();
            originalPostReplies.add(replyPost);
            original.setReplies(originalPostReplies);
            postRepository.save(original);

            //upload the images that got passed
            List<Image> postImages = new ArrayList<>();
            for (int i = 0; i < files.size(); i++) {
                Image postImage = imageService.uploadImage(files.get(i), "reply-post");
                postImages.add(postImage);
            }
            replyPost.setImages(postImages);

            return postRepository.save(replyPost);
        } catch (Exception e) {
            throw new UnableToCreatePostException();
        }
    }

    public Post repostPost(Integer postId, String token) {
        Post post = postRepository.findById(postId).orElseThrow(PostDoesNotExistException::new);
        String username = tokenService.getUsernameFromToken(token);
        ApplicationUser user = userService.getUserByUsername(username);

        Set<ApplicationUser> reposts = post.getReposts();
        if (reposts.contains(user)) {
            reposts = reposts.stream().filter(u -> !Objects.equals(u.getUserId(), user.getUserId())).collect(Collectors.toSet());
        } else {
            reposts.add(user);
        }
        post.setReposts(reposts);

        return postRepository.save(post);
    }

    public Post likePost(Integer postId, String token) {
        Post post = postRepository.findById(postId).orElseThrow(PostDoesNotExistException::new);
        String username = tokenService.getUsernameFromToken(token);
        ApplicationUser user = userService.getUserByUsername(username);

        Set<ApplicationUser> likes = post.getLikes();
        if (likes.contains(user)) {
            likes = likes.stream().filter(u -> !Objects.equals(u.getUserId(), user.getUserId())).collect(Collectors.toSet());
        } else {
            likes.add(user);
        }
        post.setLikes(likes);

        return postRepository.save(post);
    }

    public Post bookmarkPost(Integer postId, String token) {
        Post post = postRepository.findById(postId).orElseThrow(PostDoesNotExistException::new);
        String username = tokenService.getUsernameFromToken(token);
        ApplicationUser user = userService.getUserByUsername(username);

        Set<ApplicationUser> bookmarks = post.getBookmarks();
        if (bookmarks.contains(user)) {
            bookmarks = bookmarks.stream().filter(u -> !Objects.equals(u.getUserId(), user.getUserId())).collect(Collectors.toSet());
        } else {
            bookmarks.add(user);
        }
        post.setBookmarks(bookmarks);

        return postRepository.save(post);
    }

    @Transactional
    public synchronized Post viewPost(Integer postId, String token) {
        String username = tokenService.getUsernameFromToken(token);
        ApplicationUser user = userService.getUserByUsername(username);

        Post post = postRepository.findById(postId).orElseThrow(PostDoesNotExistException::new);

        Set<ApplicationUser> views = post.getViews();
//
//        // Check if the user has already viewed the post
//        if (!views.contains(user)) {
//            views.add(user);
//            post.setViews(views);
//
//            // Save the post with updated views
//            try {
//                return postRepository.save(post);
//            } catch (Exception e) {
//                // Handle the exception properly
//                return post;
//            }
//        }
//
//        return post;

        boolean hasViewed = postRepository.hasUserViewedPost(postId, user.getUserId());
        if (!hasViewed) {
            views.add(user);
            post.setViews(views);
            return postRepository.save(post);
        }
        return post;
    }

    public List<Post> viewPosts(List<Integer> postIds, String token) {
        String username = tokenService.getUsernameFromToken(token);
        ApplicationUser user = userService.getUserByUsername(username);

        List<Post> posts = postRepository.findByPostIdIn(postIds).orElse(new ArrayList<>());

        List<Post> postToUpdate = posts.stream()
                .filter(post -> !post.getViews().contains(user))
                .map(post -> {
                    Set<ApplicationUser> views = post.getViews();
                    views.add(user);
                    post.setViews(views);
                    return post;
                })
                .toList();

        List<Post> updatedPosts = postRepository.saveAll(postToUpdate);

        posts.removeAll(updatedPosts);
        posts.addAll(updatedPosts);

        Collections.sort(posts);

        return posts;
    }
}
