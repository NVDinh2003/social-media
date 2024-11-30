package com.nvd.controller.admin;

import com.nvd.dto.admin.PostTop5;
import com.nvd.models.Post;
import com.nvd.service.PostService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/admin")
@RolesAllowed("ADMIN")
@Slf4j
@RequiredArgsConstructor
class PostStatisticsController {

    private final PostService postService;

    Calendar now = Calendar.getInstance();

    @GetMapping("/total-posts/year")
    public int getTotalPostByYear() {
        Calendar now = Calendar.getInstance();
        int year = now.get(Calendar.YEAR);
        return postService.getTotalPostByYear(year);
    }

    //	lấy tổng số bài đăng
    @GetMapping("/total-posts/month")
    public int getTotalPostByMonth() {
        int month = now.get(Calendar.MONTH) + 1;
        return postService.getTotalPostByMonth(month);
    }

    // lastest update 1-11
    @GetMapping("/total-posts/day")
    public int getTotalPostByDay() {
        int day = now.get(Calendar.DAY_OF_MONTH);
        int month = now.get(Calendar.MONTH) + 1;
        return postService.getTotalPostByDay(day, month);
    }


    // lastest update 1-11
    @GetMapping("/percent-post-increase/year")
    public double getPercentPostYearIncrease() {
        int previousYear = now.get(Calendar.YEAR) - 1;
        int currentYear = now.get(Calendar.YEAR);
        int previousMonthValue = postService.getTotalPostByYear(previousYear);
        int currentMonthValue = postService.getTotalPostByYear(currentYear);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }


    // lastest update 1-11
    @GetMapping("/percent-post-increase/month")
    public double getPercentPostMonthIncrease() {
        int previousMonth = now.get(Calendar.MONTH);
        int currentMonth = previousMonth + 1;
        int previousMonthValue = postService.getTotalPostByMonth(previousMonth);
        int currentMonthValue = postService.getTotalPostByMonth(currentMonth);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

    // lastest update 1-11
    @GetMapping("/percent-post-increase/day")
    public double getPercentPostDayIncrease() {
        int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
        int currentDay = now.get(Calendar.DAY_OF_MONTH);
        int month = now.get(Calendar.MONTH) + 1;
        int previousMonthValue = postService.getTotalPostByDay(previousDay, month);
        int currentMonthValue = postService.getTotalPostByDay(currentDay, month);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

    // lastest update 1-11
    public double caculatePercentIncrease(int previousMonthValue, int currentMonthValue) {
        if (currentMonthValue == 0) {
            return 0;
        } else if (previousMonthValue == 0) {
            return 100;
        } else {
            double diff = currentMonthValue - previousMonthValue;
            double percentageIncrease = (diff / previousMonthValue) * 100;
            if (percentageIncrease < 0) {
                return 0;
            } else {
                return percentageIncrease;
            }
        }
    }

    //TOP 4 bài đăng
    @GetMapping("/top-5-posts")
    public ResponseEntity<List<PostTop5>> getTOP4User() {
        try {
            List<Object[]> top5Posts = postService.getTop5PostsByStarsAndLikesCurrentMonth();
            List<PostTop5> listTop5 = new ArrayList<>();

            for (Object[] obj : top5Posts) {
                int postId = Integer.parseInt(String.valueOf(obj[0]));
                Post post = postService.getPostEntityById(postId);

                int totalStars = ((Number) obj[1]).intValue();
                int totalLikes = ((Number) obj[2]).intValue();
                PostTop5 userTop5 = PostTop5.builder()
                        .post(post)
                        .totalStars(totalStars)
                        .totalLikes(totalLikes)
                        .build();
                listTop5.add(userTop5);
            }
            return ResponseEntity.ok(listTop5);
        } catch (Exception e) {
            log.info("Error at admin/get-top-5-posts: " + e);
            return ResponseEntity.status(403).body(null);
        }
    }

    // 22-9-2023 -Tổng số bài đăng theo từng tháng
    @GetMapping("/total-post/every-month")
    public ResponseEntity<int[]> getTotalUserEveryMonth() {
        try {
            List<Object[]> list = postService.getTotalPostEveryMonth();
            int[] listMonth = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
            int[] listTotalPost = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

            for (Object[] oj : list) {
                String month = String.valueOf(oj[0]);
                for (int i = 0; i < listMonth.length; i++) {
                    if (month.equals(String.valueOf(i + 1))) {
                        listTotalPost[i] = Integer.valueOf(String.valueOf(oj[1]));
                    }
                }
            }
            return ResponseEntity.status(200).body(listTotalPost);
        } catch (Exception e) {
            System.out.println("Error at admin/getTotalPostEveryMonth: " + e);
            return ResponseEntity.status(403).body(null);
        }
    }
}
