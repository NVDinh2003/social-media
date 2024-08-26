package com.nvd.controller;

import com.nvd.dto.CreatePostDTO;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import com.nvd.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/posts")
//@CrossOrigin("*")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping("/")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping("/")
    public Post createPost(@RequestBody CreatePostDTO postDTO) {
        return postService.createPost(postDTO);
    }

    @GetMapping("/id/{id}")
    public Post getPostById(@PathVariable int id) {
        return postService.getPostById(id);
    }

    @GetMapping("/author/{userId}")
    public Set<Post> getAllPostsByAuthor(@PathVariable("userId") int userId) {
        ApplicationUser author = new ApplicationUser();
        author.setUserId(userId);

        return postService.getAllPostsByAuthor(author);
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deletePost(@RequestBody Post post) {
        postService.deletePost(post);
        return ResponseEntity.ok("Post deleted successfully!");
    }

}
