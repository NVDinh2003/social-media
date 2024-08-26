package com.nvd.service;

import com.nvd.dto.CreatePostDTO;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import com.nvd.repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public Post createPost(CreatePostDTO dto) {
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

        try {
            Post posted = postRepository.save(post);
            return posted;
        } catch (Exception e) {
            //TODO: setup custom exception
            return null;
        }
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Integer id) {
        //TODO: setup custom exception for post that does not exist
        return postRepository.findById(id).orElse(null);
    }

    public Set<Post> getAllPostsByAuthor(ApplicationUser author) {
        Set<Post> posts = postRepository.findByAuthor(author).orElse(new HashSet<>());

        return posts;
    }

    public void deletePost(Post p) {
        postRepository.delete(p);
    }
}
