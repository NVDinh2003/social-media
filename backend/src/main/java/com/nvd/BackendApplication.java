package com.nvd;

import com.nvd.models.Role;
import com.nvd.repositories.RoleRepository;
import com.nvd.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(RoleRepository roleRepository, UserService userService) {
        return args -> {
            roleRepository.save(new Role(1, "USER"));
            roleRepository.save(new Role(2, "ADMIN"));

//            ApplicationUser user = ApplicationUser.builder()
//                    .firstName("Leo")
//                    .lastName("Nguyen")
//                    .build();
//
//            userService.registerUser(user);
        };
    }
}
