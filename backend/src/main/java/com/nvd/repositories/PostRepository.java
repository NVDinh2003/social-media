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
    String FEED_QUERY = "    SELECT * FROM (\n" +
            "        SELECT \n" +
            "            post_id, audience, content, posted_date, is_reply, reply_restriction, reply_to, \n" +
            "            scheduled, scheduled_date, author_id, poll_id\n" +
            "        FROM posts \n" +
            "        WHERE author_id = :id\n" +
            "\n" +
            "        UNION\n" +
            "\n" +
            "        SELECT \n" +
            "            p.post_id, p.audience, p.content, p.posted_date, p.is_reply, p.reply_restriction, p.reply_to, \n" +
            "            p.scheduled, p.scheduled_date, p.author_id, p.poll_id\n" +
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
            "        SELECT \n" +
            "            p.post_id, p.audience, p.content, p.posted_date, p.is_reply, p.reply_restriction, p.reply_to, \n" +
            "            p.scheduled, p.scheduled_date, p.author_id, p.poll_id\n" +
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

    @Query(nativeQuery = true, value = FEED_QUERY)
    Page<Post> findFeedPosts(@Param("id") Integer id, @Param("session_start") LocalDateTime sessionDate, Pageable pageable);
}
