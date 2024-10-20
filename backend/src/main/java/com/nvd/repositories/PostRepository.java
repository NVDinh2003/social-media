package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    Optional<Set<Post>> findByAuthor(ApplicationUser author);

    // lấy tất cả các bài đăng có liên quan đến user,
    // union
    // lấy tất cả các bài đăng mà user đó đã repost (có following)
    // union
    // lấy tất cả các bài đăng mà user đó đang theo dõi (có following)
    String FEED_QUERY = "SELECT * FROM (\n" +
            "        SELECT *\n" +
            "        FROM posts \n" +
            "        WHERE author_id = :id\n" +
            "\n" +
            "        UNION\n" +
            "\n" +
            "        SELECT p.*\n" +
            "        FROM posts p\n" +
            "        INNER JOIN post_repost_juntion prj ON p.post_id = prj.post_id\n" +
            "        WHERE prj.user_id IN (\n" +
            "            SELECT u.user_id AS following_id \n" +
            "            FROM users u\n" +
            "            INNER JOIN \"following\" f ON u.user_id = f.following_id\n" +
            "            WHERE f.user_id = :id AND NOT f.following_id = :id\n" +
            "        )\n" +
            "\n" +
            "        UNION\n" +
            "\n" +
            "        SELECT p.*\n" +
            "        FROM posts p\n" +
            "        WHERE p.author_id IN (\n" +
            "            SELECT u.user_id AS following_id\n" +
            "            FROM users u\n" +
            "            INNER JOIN \"following\" ON u.user_id = following.following_id \n" +
            "            WHERE following.user_id = :id AND NOT following.following_id = :id\n" +
            "        )\n" +
            "    ) AS p \n" +
            "    WHERE p.posted_date <= :session_start \n" +
            "    ORDER BY p.posted_date DESC";


    @Query(nativeQuery = true, value = FEED_QUERY,
            countQuery = "SELECT COUNT(*) FROM (" + FEED_QUERY + ") AS feed_count"
    )
    Page<Post> findFeedPosts(@Param("id") Integer id, @Param("session_start") LocalDateTime sessionDate, Pageable pageable);


    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN TRUE ELSE FALSE END FROM Post p JOIN p.views v WHERE p.postId = :postId AND v.userId = :userId")
    boolean hasUserViewedPost(@Param("postId") Integer postId, @Param("userId") Integer userId);

    Optional<List<Post>> findByPostIdIn(List<Integer> postIds);
}
