package com.nvd.service;

import com.nvd.dto.oauth.UserInfoResponse;
import com.nvd.dto.request.FindUsernameDTO;
import com.nvd.dto.request.UserUpdateDTO;
import com.nvd.exceptions.*;
import com.nvd.mappers.UserMapper;
import com.nvd.models.ApplicationUser;
import com.nvd.models.Image;
import com.nvd.models.RegistrationObject;
import com.nvd.models.Role;
import com.nvd.repositories.RoleRepository;
import com.nvd.repositories.UserRepository;
import com.nvd.utils.FileUploadUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.Date;
import java.text.Normalizer;
import java.util.Calendar;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;
    private final UserMapper userMapper;

    Calendar now = Calendar.getInstance();
    int year = now.get(Calendar.YEAR);


    public ApplicationUser registerUser(RegistrationObject ro) {
        ApplicationUser user = new ApplicationUser();
        user.setFirstName(ro.getFirstName());
        user.setLastName(ro.getLastName());
        user.setEmail(ro.getEmail());
        user.setDateOfBirth(ro.getDob());

        String name = user.getFirstName() + user.getLastName();
        boolean nameTaken = true;
        String tempName = "";
        while (nameTaken) {
            tempName = generateUserNameAndNickname(name);
            if (userRepository.findByUsername(tempName).isEmpty()) {
                nameTaken = false;
            }
        }
        user.setUsername(tempName);
        user.setNickname(tempName);

        Set<Role> roles = user.getAuthorities();
        if (roleRepository.findByAuthority("USER").isPresent()) {
            roles.add(roleRepository.findByAuthority("USER").get());
            user.setAuthorities(roles);
        }

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }

    }

//    private String generateUserName(String name) {
//        long genarateNumber = (long) Math.floor(Math.random() * 1_000_000_000);
//        return name + genarateNumber;
//    }

    public static String generateUserNameAndNickname(String name) {
        String temp = Normalizer.normalize(name, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String[] parts = pattern.matcher(temp).replaceAll("").toLowerCase().replaceAll("đ", "d").split(" ");
        long generateNumber = (long) Math.floor(Math.random() * 1_000_000);
        return parts[parts.length - 1] + generateNumber;
    }

    public ApplicationUser getUserById(Integer userId) {
        return userRepository.findById(userId).orElseThrow(UserDoesNotExistException::new);
    }

    public List<ApplicationUser> getAllUsersByIds(List<Integer> userIds) {
        return userRepository.findAllById(userIds);
    }

    public ApplicationUser getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
    }

    public ApplicationUser update(ApplicationUser user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    public void generateEmailVerification(String username) {
        ApplicationUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
        user.setVerification(generateVerificationNumber());

        try {
            mailService.sendMail(user.getEmail(), "Your verification code", "Here is your verification code: " + user.getVerification());
            userRepository.save(user);
        } catch (Exception e) {
            throw new EmailFaildToSendException();
        }
        userRepository.save(user);
    }

    public ApplicationUser verifyEmail(String username, Long code) {
        ApplicationUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        if (code.equals(user.getVerification())) {
            user.setEnabled(true);
            user.setVerification(null);
            return userRepository.save(user);
        } else {
            throw new IncorrectVerificationCodeException();
        }
    }

    public ApplicationUser setPassword(String username, String password) {
        ApplicationUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    private Long generateVerificationNumber() {
        return (long) Math.floor(Math.random() * 100_000_000);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser u = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Set<GrantedAuthority> authorities = u.getAuthorities()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toSet());

        return new User(u.getUsername(), u.getPassword(), authorities);
    }

    public ApplicationUser setProfileOrBannerPicture(String username, MultipartFile file, String prefix)
            throws UnableToSavePhotoException {
        ApplicationUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        Image image = imageService.uploadImage(file, prefix);

        if (prefix.equals("pfp")) {
            user.setProfilePicture(image);
        } else {
            user.setBannerPicture(image);
        }

        return userRepository.save(user);
    }

    public byte[] setUserOrganization(String username, MultipartFile file, String organizationName)
            throws UnableToResolvePhotoException {
        ApplicationUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        Image orgImg = imageService.getImageByImageName(organizationName).orElseGet(() -> {
            try {
                return imageService.createOrganization(file, organizationName);
            } catch (UnableToSavePhotoException e) {
                throw null;
            }
        });

        if (orgImg != null) {
            user.setOrganization(orgImg);
            userRepository.save(user);
            try {
                return Files.readAllBytes(new File(orgImg.getImagePath()).toPath());
            } catch (IOException e) {
                throw new UnableToResolvePhotoException();
            }
        } else {
            throw new UnableToResolvePhotoException("We were unable to find or save the photo. Please try again.");
        }
    }

    public ApplicationUser followUser1(String user, String followee) {
        ApplicationUser loggedInUser = userRepository.findByUsername(user).orElseThrow(UserDoesNotExistException::new);

        Set<ApplicationUser> followingList = loggedInUser.getFollowing();
        ApplicationUser followedUser = userRepository.findByUsername(followee).orElseThrow(UserDoesNotExistException::new);

        Set<ApplicationUser> followersList = followedUser.getFollowers();

        if (followingList.contains(followedUser)) {
            followersList.remove(followedUser);
        } else {
            // Add the followed user to the following list
            followingList.add(followedUser);
        }
        loggedInUser.setFollowing(followingList);

        if (followersList.contains(loggedInUser)) {

            followersList.remove(loggedInUser);
        } else {
            // Add the current user to the followers list of the followee
            followersList.add(loggedInUser);
        }
        followedUser.setFollowers(followersList);

        // Save both users
        userRepository.save(loggedInUser);
        userRepository.save(followedUser);

        return loggedInUser;
    }


    public ApplicationUser followUser(String user, String followee) {
        ApplicationUser loggedInUser = userRepository.findByUsername(user)
                .orElseThrow(UserDoesNotExistException::new);

        ApplicationUser followedUser = userRepository.findByUsername(followee)
                .orElseThrow(UserDoesNotExistException::new);

        Set<ApplicationUser> followingList = loggedInUser.getFollowing();
        Set<ApplicationUser> followersList = followedUser.getFollowers();

        // Check if the logged-in user is already following the followee
        if (followingList.contains(followedUser)) {
            // If yes, unfollow: remove from both following and followers lists
            followingList.remove(followedUser);
            followersList.remove(loggedInUser);
        } else {
            // If not, follow: add to both following and followers lists
            followingList.add(followedUser);
            followersList.add(loggedInUser);
        }

        // Set the updated following and followers lists
        loggedInUser.setFollowing(followingList);
        followedUser.setFollowers(followersList);

        // Save both users to update the database
        userRepository.save(loggedInUser);
        userRepository.save(followedUser);

        return loggedInUser;
    }

    public Set<ApplicationUser> retrieveFollowingList(String username) {
        ApplicationUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
        return user.getFollowing();
    }

    public Set<ApplicationUser> retrieveFollowersList(String username) {
        ApplicationUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
        return user.getFollowers();
    }

    public String verifyUsername(FindUsernameDTO credential) {
        ApplicationUser user = userRepository.findByEmailOrPhoneOrUsername(
                        credential.getEmail(), credential.getPhone(),
                        credential.getUsername())
                .orElseThrow(UserDoesNotExistException::new);
        return user.getUsername();
    }

    public ApplicationUser getUsersEmailAndPhone(FindUsernameDTO credential) {
        return userRepository.findByEmailOrPhoneOrUsername(
                        credential.getEmail(), credential.getPhone(),
                        credential.getUsername())
                .orElseThrow(UserDoesNotExistException::new);
    }

    public ApplicationUser testFollowUser(String user1, String followToUser) {
        return followUser(user1, followToUser);
    }

    public ApplicationUser getOrCreateGoogleUser(UserInfoResponse userInfo) {
        String email = userInfo.getEmail();
        String name = userInfo.getName();
        return userRepository.findByEmail(email).orElseGet(() -> {
            // Tạo người dùng mới nếu user lần đầu đăng nhập
            ApplicationUser newUser = new ApplicationUser();
            newUser.setEmail(email);
            String username = email.substring(0, email.indexOf('@'));
            newUser.setUsername(username);
            newUser.setNickname(username);
            newUser.setDateOfBirth(Date.valueOf("2000-01-01"));  // default dob
            String imageName = FileUploadUtil.getFileName(username + "-google-profile-picture");
            newUser.setProfilePicture(Image.builder().imageURL(userInfo.getPicture()).imageName(imageName).build());

            // Split the full name into first name and last name
            String[] nameParts = name.split(" ", 2);
            if (nameParts.length == 2) {
                newUser.setFirstName(nameParts[0]);
                newUser.setLastName(nameParts[1]);
            } else {
                newUser.setFirstName(name);
                newUser.setLastName("");
            }

            Role userRole = roleRepository.findByAuthority("USER")
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            newUser.getAuthorities().add(userRole);

            return userRepository.save(newUser);
        });
    }

    @Transactional
    public ApplicationUser updateUser(UserUpdateDTO userUpdateDTO, String loggedInUsername) {
        ApplicationUser user = userRepository.findByUsername(loggedInUsername)
                .orElseThrow(() -> new EntityNotFoundException("Not found user with username: " + loggedInUsername));

        ApplicationUser updated = userMapper.updateEntity(userUpdateDTO, user);

//        updated.setId(teamId);

        userRepository.save(updated);

        return updated;
    }

    public ApplicationUser getCurrentUser() {
        ApplicationUser user = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username != null) {
            try {
                user = userRepository.findByUsername(username).orElse(null);
            } catch (Exception e) {
                user = null;
            }
        }
        return user;
    }

    // ban user if in reported
    public void disable(ApplicationUser user) {
        int roleId = roleRepository.findRoleByUserID(user.getUserId());
        if (Boolean.TRUE.equals(user.getEnabled())) {
            if (roleId != 1) {
                user.setEnabled(false);
            }
        } else {
            user.setEnabled(true);
        }
        userRepository.save(user);
    }

    // ==========  STATISTICS users
    public List<Object[]> getTop5UsersByPostsAndStarsCurrentMonth() {
        return userRepository.findTop5UsersByPostsAndStarsCurrentMonth();
    }

    // lấy tổng số người dùng theo ngày
    public int getTotalUserByDay(int day, int month) {
        return userRepository.getTotalUserByDay(day, month, year);
    }

    // lấy tổng số người dùng theo tháng
    public int getTotalUserByMonth(int month) {
        return userRepository.getTotalUserByMonth(month, year);
    }

    // lấy tổng số người dùng theo năm
    public int getTotalUserByYear(int yearx) {
        return userRepository.getTotalUserByYear(yearx);
    }

    // Tổng số người dùng tham gia từng theo từng tháng
    public List<Object[]> getTotalUserEveryMonth() {
        return userRepository.getTotalUserEveryMonth(year);
    }

}
