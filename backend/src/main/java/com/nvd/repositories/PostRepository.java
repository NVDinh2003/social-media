package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    Optional<Set<Post>> findByAuthor(ApplicationUser author);

    
}
