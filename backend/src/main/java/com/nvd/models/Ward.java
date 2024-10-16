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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "wards")
public class Ward {
    @Id
    @JsonProperty("wardCode")
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
