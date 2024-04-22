package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
//@NoArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "users")
public class ApplicationUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    private String firstName;
    private String lastName;
    private String phone;
    @Column(unique = true)
    private String email;
    @Column(name = "dob")
    private Date dateOfBirth;
    @Column(unique = true)
    private String username;
    @JsonIgnore
    private String password;

    private Boolean enabled;
    @JsonIgnore
    @Column(nullable = true)
    private Long verification;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles_junction",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> authorities;  // set để không trùng role

    public ApplicationUser() {
        this.authorities = new HashSet<>();
        this.enabled = false;
    }
}