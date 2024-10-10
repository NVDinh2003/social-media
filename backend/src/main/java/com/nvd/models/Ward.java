package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "wards")
public class Ward {
    @Id
    private String code;
    @JsonIgnore
    private String name;
    private String fullName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "district_code", referencedColumnName = "code")
    @JsonIgnore
    private District district;

    @JsonIgnore
    @OneToMany(mappedBy = "ward")
    List<Post> post;
}
