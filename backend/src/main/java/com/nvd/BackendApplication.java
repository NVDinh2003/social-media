package com.nvd;

import com.nvd.config.RSAKeyProperties;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Role;
import com.nvd.repositories.RoleRepository;
import com.nvd.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@EnableConfigurationProperties(RSAKeyProperties.class)
@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            Role role1 = roleRepository.save(new Role(1, "USER"));
            Role role2 = roleRepository.save(new Role(2, "ADMIN"));

            Set<Role> roles = new HashSet<>();
            roles.add(role1);

            ApplicationUser user = ApplicationUser.builder()
                    .authorities(roles)
                    .firstName("Leo")
                    .lastName("Nguyen")
                    .email("iamdinhhtvq@gmail.com")
                    .username("dinhhtvq")
                    .password(encoder.encode("dinhhtvq123"))
                    .enabled(true)
                    .build();

            userRepository.save(user);
//            userService.registerUser(user);
        };
    }
}
