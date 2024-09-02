package com.nvd.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvd.dto.CreatePostDTO;
import com.nvd.exceptions.PostDoesNotExistException;
import com.nvd.exceptions.UnableToCreatePostException;
import com.nvd.models.*;
import com.nvd.repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final ImageService imageService;
    private final PollService pollService;

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
            post.setPostedDate(new Date());

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
                p.setPostedDate(new Date());

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

    public void deletePost(Post p) {
        postRepository.delete(p);
    }
}
