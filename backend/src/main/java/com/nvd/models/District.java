package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "districts")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class District {
    @Id
    @JsonProperty("districtCode")
    private String code;
    @JsonIgnore
    private String name;
    private String fullName;

    @ManyToOne(fetch = FetchType.EAGER)
//    @ManyToOne
    @JoinColumn(name = "province_code", referencedColumnName = "code")
    @JsonIgnore
    private Province province;

    @JsonIgnore
    @OneToMany(mappedBy = "district")
    List<Ward> wards;

    @JsonIgnore
    @OneToMany(mappedBy = "district")
    List<Post> post;

}