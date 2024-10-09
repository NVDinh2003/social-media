package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "districts")
public class District {
    @Id
    private String code;
    @JsonIgnore
    private String name;
    private String fullName;

    @ManyToOne(fetch = FetchType.EAGER)
//    @ManyToOne
    @JoinColumn(name = "province_code", referencedColumnName = "code")
    @JsonIgnore
    private Province province;


}