package com.nvd.controller;

import com.nvd.models.ApplicationUser;
import com.nvd.service.DiscoveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/discovery")
@RequiredArgsConstructor
public class DiscoveryController {

    private final DiscoveryService discoveryService;

    @GetMapping("/users")
    public List<ApplicationUser> searchForUsers(@RequestParam String searchTerm) {
        return discoveryService.searchForUsers(searchTerm);
    }
}
