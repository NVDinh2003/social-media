package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "provinces")
public class Province {
    @Id
    private String code;
    @JsonIgnore
    private String name;
    private String fullName;

    @JsonIgnore
    @OneToMany(mappedBy = "province")
    List<District> districts;


    @JsonIgnore
    @OneToMany(mappedBy = "province")
    List<Post> post;

}
