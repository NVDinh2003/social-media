package com.nvd.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegistrationObject {
    private String firstName;
    private String lastName;
    private String email;
    private Date dob;
}
