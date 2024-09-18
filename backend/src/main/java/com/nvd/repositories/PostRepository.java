package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    Optional<Set<Post>> findByAuthor(ApplicationUser author);

    //    @Query("Select p from Post p where p.author IN (:authors) and p.postedDate <= :sessionDate")
    @Query(nativeQuery = true, value = "select get_feed_posts(:id, :session_start)")
    Page<Post> findFeedPosts(@Param("id") Integer id, @Param("session_start") Date sessionDate, Pageable pageable);
}
