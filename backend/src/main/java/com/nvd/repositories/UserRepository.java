package com.nvd.repositories;

import com.nvd.models.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, Integer> {
    Optional<ApplicationUser> findByUsername(String username);

    Optional<ApplicationUser> findByEmailOrPhoneOrUsername(String email, String phone, String username);

    List<ApplicationUser> findByUsernameLikeIgnoreCase(String username);

    List<ApplicationUser> findByNicknameLikeIgnoreCase(String nickname);

    List<ApplicationUser> findByBioLikeIgnoreCase(String bio);

    Optional<ApplicationUser> findByEmail(String email);

    @Query(value = "SELECT u.username, COUNT(p.post_id) AS post_count, COUNT(psj.user_id) AS star_count " +
            "FROM users u " +
            "LEFT JOIN posts p ON u.user_id = p.author_id " +
            "LEFT JOIN post_star_junction psj ON p.post_id = psj.post_id " +
            "WHERE DATE_TRUNC('month', p.posted_date) = DATE_TRUNC('month', CURRENT_DATE) " +
            "GROUP BY u.user_id " +
            "ORDER BY post_count DESC, star_count DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Object[]> findTop5UsersByPostsAndStarsCurrentMonth();


}
