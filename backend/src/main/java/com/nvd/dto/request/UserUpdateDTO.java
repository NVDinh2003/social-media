package com.nvd.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {
    private String firstName;
    private String lastName;
    //    private String phone;
    private String bio;
    private String nickname;
    private Date dateOfBirth;
//    private Boolean privateAccount;

}