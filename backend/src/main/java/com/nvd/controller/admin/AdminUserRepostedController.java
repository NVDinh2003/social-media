package com.nvd.controller.admin;

import com.nvd.models.ApplicationUser;
import com.nvd.service.UserReportedService;
import com.nvd.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@RolesAllowed("ADMIN")
public class AdminUserRepostedController {

    private final UserReportedService userReportedService;
    private final UserService userService;

    Calendar now = Calendar.getInstance();
    int month = now.get(Calendar.MONTH) + 1;

    @GetMapping("/get-list-users-reported-by-day")
    public ResponseEntity<List<ApplicationUser>> getListUserReportedByDay() {
        try {
            int day = now.get(Calendar.DAY_OF_MONTH);
            List<Object[]> list = userReportedService.getAllUserReportedByDay(day, month);

            return ResponseEntity.status(200).body(setListUserReportedDetail(list));
        } catch (Exception e) {
            System.out.println("Error at admin/getListUserReportedByDay: " + e);
            return ResponseEntity.status(403).body(null);
        }

    }
}
