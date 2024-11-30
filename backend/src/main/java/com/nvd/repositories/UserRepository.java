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


    // STATISTICS users
    @Query(value = "SELECT u.username, COUNT(p.post_id) AS post_count, COUNT(psj.user_id) AS star_count " +
            "FROM users u " +
            "LEFT JOIN posts p ON u.user_id = p.author_id " +
            "LEFT JOIN post_star_junction psj ON p.post_id = psj.post_id " +
            "WHERE DATE_TRUNC('month', p.posted_date) = DATE_TRUNC('month', CURRENT_DATE) " +
            "GROUP BY u.user_id " +
            "ORDER BY post_count DESC, star_count DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Object[]> findTop5UsersByPostsAndStarsCurrentMonth();

    //-lấy tổng số người dùng theo ngày
    @Query(value = "SELECT COUNT(user_id) FROM users WHERE EXTRACT(DAY FROM create_ts)=:day AND EXTRACT(MONTH FROM create_ts)=:month AND EXTRACT(YEAR FROM create_ts)=:year", nativeQuery = true)
    int getTotalUserByDay(int day, int month, int year);

    // -lấy tổng số người dùng theo tháng
    @Query(value = "SELECT COUNT(user_id) FROM users WHERE EXTRACT(MONTH FROM create_ts)=:month AND EXTRACT(YEAR FROM create_ts)=:year", nativeQuery = true)
    int getTotalUserByMonth(int month, int year);

    //  -lấy tổng số người dùng theo năm
    @Query(value = "SELECT COUNT(user_id) FROM users WHERE EXTRACT(YEAR FROM create_ts)=:year", nativeQuery = true)
    int getTotalUserByYear(int year);

    //  -Tổng số người dùng tham gia từng theo từng tháng
    @Query(value = "SELECT EXTRACT(MONTH FROM create_ts) AS MONTH, COUNT(user_id) "
            + "FROM users WHERE EXTRACT(YEAR FROM create_ts)=:year GROUP BY EXTRACT(MONTH FROM create_ts) ORDER BY EXTRACT(MONTH FROM create_ts) ASC", nativeQuery = true)
    List<Object[]> getTotalUserEveryMonth(int year);
}
