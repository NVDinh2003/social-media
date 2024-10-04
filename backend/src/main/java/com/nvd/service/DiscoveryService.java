package com.nvd.service;

import com.nvd.models.ApplicationUser;
import com.nvd.repositories.UserRepository;
import com.nvd.utils.DiscoveryUserComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiscoveryService {

    private final UserRepository userRepository;
    private final DiscoveryUserComparator discoveryUserComparator;

    @Autowired
    public DiscoveryService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.discoveryUserComparator = new DiscoveryUserComparator();
    }


    public List<ApplicationUser> searchForUsers(String searchTerm) {
        List<ApplicationUser> usersByUsername = userRepository.findByUsernameLikeIgnoreCase("%" + searchTerm + "%");
        List<ApplicationUser> usersByNickname = userRepository.findByNicknameLikeIgnoreCase("%" + searchTerm + "%");
        List<ApplicationUser> usersByBio = userRepository.findByBioLikeIgnoreCase("%" + searchTerm + "%");

        List<ApplicationUser> allUsers = new ArrayList<>();
        allUsers.addAll(usersByUsername);
        allUsers.addAll(usersByNickname);
        allUsers.addAll(usersByBio);

        allUsers = allUsers.stream().distinct().collect(Collectors.toList());
        Collections.sort(allUsers, discoveryUserComparator);

        return allUsers;
        // => Tập hợp người dùng được sắp xếp theo số lượng followers giảm dần.
    }
}
