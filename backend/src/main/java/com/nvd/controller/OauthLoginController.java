package com.nvd.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OauthLoginController {
    @GetMapping("/login-success")
    public String loginSuccess(@AuthenticationPrincipal OAuth2User principal, Model model) {
        model.addAttribute("name", principal.getAttribute("name"));
        return "home"; // Trả về trang home hoặc trang bạn muốn hiển thị sau khi đăng nhập thành công
    }
}
