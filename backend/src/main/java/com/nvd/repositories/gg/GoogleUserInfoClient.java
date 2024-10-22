package com.nvd.repositories.gg;

import com.nvd.dto.oauth.UserInfoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "google-userinfo", url = "https://www.googleapis.com")
public interface GoogleUserInfoClient {
    @GetMapping("/oauth2/v1/userinfo")
    UserInfoResponse getUserInfo(@RequestParam("access_token") String accessToken);
}
