package com.nvd.controller.admin;

import com.nvd.dto.admin.UserReportedDetail;
import com.nvd.models.ApplicationUser;
import com.nvd.service.PostService;
import com.nvd.service.UserReportedService;
import com.nvd.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Year;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@RolesAllowed("ADMIN")
public class AdminUserRepostedController {

    private final UserReportedService userReportedService;
    private final UserService userService;
    private final PostService postService;

    Calendar now = Calendar.getInstance();
    int month = now.get(Calendar.MONTH) + 1;

    @GetMapping("/list-users-reported-by-day")
    public ResponseEntity<List<UserReportedDetail>> getListUserReportedByDay() {
        try {
            int day = now.get(Calendar.DAY_OF_MONTH);
            List<Object[]> list = userReportedService.getAllUserReportedByDay(day, month);

            return ResponseEntity.status(200).body(setListUserReportedDetail(list));
        } catch (Exception e) {
            System.out.println("Error at admin/getListUserReportedByDay: " + e);
            return ResponseEntity.status(403).body(null);
        }
    }

    @GetMapping("/list-users-reported-by-year")
    public ResponseEntity<List<UserReportedDetail>> getListUserReportedByYear() {
        try {
            int year = Year.now().getValue();
            List<Object[]> list = userReportedService.getAllUserReportedByYear(year);

//            for (Object[] oj : list) {
//                System.out.println("test user reported id: " + oj[0]);
//            }

            return ResponseEntity.status(200).body(setListUserReportedDetail(list));
        } catch (Exception e) {
            System.out.println("Error at admin/getListUserReportedByYear: " + e);
            return ResponseEntity.status(403).body(null);
        }

    }


    @GetMapping("/total-user-reported-by-year")
    public int getTotalUserReportedByYear() {
        int year = now.get(Calendar.YEAR);
        return userReportedService.getTotalUserReportedByYear(year);
    }

    @GetMapping("/total-user-reported-by-month")
    public int getTotalUserReportedByMonth() {

        return userReportedService.getTotalUserReportedByMonth(month);
    }

    @GetMapping("/total-user-reported-by-day")
    public int getTotalUserReportedByDay() {
        int day = now.get(Calendar.DAY_OF_MONTH);
        return userReportedService.getTotalUserReportedByDay(day, month);
    }

    @GetMapping("/percent-user-reported-year-increase")
    public double getPercentUserReportedYearIncrease() {
        int previousYear = now.get(Calendar.YEAR) - 1;
        int currentYear = now.get(Calendar.YEAR);
        int previousMonthValue = userReportedService.getTotalUserReportedByYear(previousYear);
        int currentMonthValue = userReportedService.getTotalUserReportedByYear(currentYear);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

    @GetMapping("/percent-user-reported-month-increase")
    public double getPercentUserReportedMonthIncrease() {
        int previousMonth = now.get(Calendar.MONTH);
        int currentMonth = previousMonth + 1;
        int previousMonthValue = userReportedService.getTotalUserReportedByMonth(previousMonth);
        int currentMonthValue = userReportedService.getTotalUserReportedByMonth(currentMonth);

        return caculatePercentIncrease(previousMonthValue, currentMonthValue);
    }

    @GetMapping("/percent-user-reported-day-increase")
    public double getPercentUserReportedDayIncrease() {
        int previousDay = now.get(Calendar.DAY_OF_MONTH) - 1;
        int currentDay = now.get(Calendar.DAY_OF_MONTH);
        int previousMonthValue = userReportedService.getTotalUserReportedByDay(previousDay, month);
        int currentMonthValue = userReportedService.getTotalUserReportedByDay(currentDay, month);

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


    public List<UserReportedDetail> setListUserReportedDetail(List<Object[]> list) {

        List<UserReportedDetail> listUserReportedDetails = new ArrayList<>();

        for (Object[] oj : list) {
            UserReportedDetail userReportedDetail = new UserReportedDetail();
            ApplicationUser user = userService.getUserById(Integer.valueOf(String.valueOf(oj[0])));
            userReportedDetail.setUser_id(user.getUserId());
            userReportedDetail.setEmail(user.getEmail());
            userReportedDetail.setUsername(user.getUsername());
            userReportedDetail.setNickname(user.getNickname());
            userReportedDetail.setProfile_picture(user.getProfilePicture());
            userReportedDetail.setVerified_account(user.getVerifiedAccount());

            int totalPost = postService.countPostByUser(user.getUserId());
            userReportedDetail.setTotal_posts(totalPost);
            userReportedDetail.setTotal_reported(Integer.parseInt(String.valueOf(oj[1])));
            listUserReportedDetails.add(userReportedDetail);
        }

        return listUserReportedDetails;
    }
}
