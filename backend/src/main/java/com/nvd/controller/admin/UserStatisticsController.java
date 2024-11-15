package com.nvd.controller.admin;

import com.nvd.dto.admin.UserTop5;
import com.nvd.models.ApplicationUser;
import com.nvd.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
@RequiredArgsConstructor
@Slf4j
public class UserStatisticsController {
    private final UserService userService;

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

}
