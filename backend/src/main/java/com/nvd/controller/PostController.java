package com.nvd.controller;

import com.nvd.dto.CreatePostDTO;
import com.nvd.exceptions.PostDoesNotExistException;
import com.nvd.exceptions.UnableToCreatePostException;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import com.nvd.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/posts")
//@CrossOrigin("*")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @ExceptionHandler({UnableToCreatePostException.class})
    public ResponseEntity<String> handleUnableToCreatePost() {
        return new ResponseEntity<>("Unable to create post at this time", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({PostDoesNotExistException.class})
    public ResponseEntity<String> handlePostDoesntExist() {
        return new ResponseEntity<>("Post doesnt exist", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public Post createPost(@RequestBody CreatePostDTO postDTO) {
        return postService.createPost(postDTO);
    }

    @PostMapping(value = "/media", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public Post createMediaPost(@RequestPart("post") String post, @RequestPart("media") List<MultipartFile> files) {
        return postService.createMediaPost(post, files);
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
