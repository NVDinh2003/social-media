package com.nvd.controller.admin;

import com.nvd.dto.admin.UserTop5;
import com.nvd.models.ApplicationUser;
import com.nvd.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
@RequiredArgsConstructor
@Slf4j
@RolesAllowed("ADMIN")
public class UserStatisticsController {
    private final UserService userService;

    Calendar now = Calendar.getInstance();
    int previousMonth = now.get(Calendar.MONTH);
    int currentMonth = previousMonth + 1;

    @GetMapping("/get-top-5-users")
    public ResponseEntity<List<UserTop5>> getTop5Users() {
        try {
            List<Object[]> top5Users = userService.getTop5UsersByPostsAndStarsCurrentMonth();
            List<UserTop5> listTop5 = new ArrayList<>();

            for (Object[] obj : top5Users) {
                String username = String.valueOf(obj[0]);
                ApplicationUser user = userService.getUserByUsername(username);

                int totalPosts = ((Number) obj[1]).intValue();
                int totalStars = ((Number) obj[2]).intValue();
                UserTop5 userTop5 = UserTop5.builder()
                        .user(user)
                        .totalPosts(totalPosts)
                        .totalStars(totalStars)
                        .build();
                listTop5.add(userTop5);
            }
            return ResponseEntity.ok(listTop5);
        } catch (Exception e) {
            log.info("Error at admin/get-top-5-users: " + e);
            return ResponseEntity.status(403).body(null);
        }
    }


    @GetMapping("/total-users/year")
    public int getTotalUserByYear() {
        int year = now.get(Calendar.YEAR);
        return userService.getTotalUserByYear(year);
    }

    // lấy tổng số người dùng trong thangs
    @GetMapping("/total-users/month")
    public int getTotalUserByMonth() {
        int month = now.get(Calendar.MONTH) + 1;
        return userService.getTotalUserByMonth(month);
    }

    @GetMapping("/total-users/day")
    public int getTotalUserByDay() {
        int day = now.get(Calendar.DAY_OF_MONTH);
        int month = now.get(Calendar.MONTH);
        return userService.getTotalUserByDay(day, month);
    }

    @GetMapping("/percent-users-increase/year")
    public double getPercentUserYearIncrease() {
        int previousYear = now.get(Calendar.YEAR) - 1;
        int currentYear = now.get(Calendar.YEAR);
        int previousMonthValue = userService.getTotalUserByYear(previousYear);
        int currentMonthValue = userService.getTotalUserByYear(currentYear);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

    @GetMapping("/percent-users-increase/month")
    public double getPercentUserByMonthIncrease() {
        int previousMonthValue = userService.getTotalUserByMonth(previousMonth);
        int currentMonthValue = userService.getTotalUserByMonth(currentMonth);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

    @GetMapping("/percent-users-increase/day")
    public double getPercentUserDayIncrease() {
        int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
        int currentDay = now.get(Calendar.DAY_OF_MONTH);
        int month = now.get(Calendar.MONTH) + 1;
        int previousMonthValue = userService.getTotalUserByDay(previousDay, month);
        int currentMonthValue = userService.getTotalUserByDay(currentDay, month);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

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


    //Tổng số người dùng tham gia từng theo từng tháng
    @GetMapping("/total-users/every-month")
    public ResponseEntity<int[]> getTotalUserEveryMonth() {
        try {
            List<Object[]> list = userService.getTotalUserEveryMonth();
            int[] listMonth = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};
            int[] listTotalUser = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

            for (Object[] oj : list) {
                String month = String.valueOf(oj[0]);
                for (int i = 0; i < listMonth.length; i++) {
                    if (month.equals(String.valueOf(i + 1))) {
                        listTotalUser[i] = Integer.valueOf(String.valueOf(oj[1]));
                    }
                }
            }
            return ResponseEntity.status(200).body(listTotalUser);
        } catch (Exception e) {
            System.out.println("Error at admin/total-users/every-month: " + e);
            return ResponseEntity.status(403).body(null);
        }
    }

}
