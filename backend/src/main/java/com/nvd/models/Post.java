package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nvd.models.enums.Audience;
import com.nvd.models.enums.ReplyRestriction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@Table(name = "posts")
//           implements interface Comparable kiểu Post. Cho phép các obj Post có thể so sánh với nhau.
public class Post implements Comparable<Post> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer postId;


    @Column(length = 256, nullable = false)
    private String content;

    @Column(name = "posted_date")
    private LocalDateTime postedDate;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private ApplicationUser author;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_likes_junction",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> likes;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "post_id")
    private List<Image> images;

    //TODO: Figure out video upload

    @Column(name = "is_reply")
    private Boolean isReply;

    @Column(name = "reply_to")
    private Integer replyTo;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_reply_junction",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "reply_id")
    )
//    @JsonIgnore
    private Set<Post> replies;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_repost_junction",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> reposts;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_star_junction",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> stars;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_view_junction",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> views;

    private boolean scheduled;
    @Column(name = "scheduled_date")
    private LocalDateTime scheduledDate;

    @Enumerated(EnumType.ORDINAL)   // lưu dạng số nguyên, thứ tự (ordinal) của enum đó trong định nghĩa
    private Audience audience;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "reply_restriction")
    private ReplyRestriction replyRestriction;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "poll_id", referencedColumnName = "poll_id")
    private Poll poll;

    @JsonIgnore
    @OneToMany(mappedBy = "reportedPost")
    List<PostReported> reportedPosts;

    private String address;
    //    @JsonIgnore
    @JsonProperty("provinceCode")
    @ManyToOne
    @JoinColumn(name = "post_province_id")
    Province province;

    //    @JsonIgnore
    @JsonProperty("districtCode")
    @ManyToOne
    @JoinColumn(name = "post_district_id")
    District district;

    //    @JsonIgnore
    @JsonProperty("wardCode")
    @ManyToOne
    @JoinColumn(name = "post_ward_id")
    Ward ward;

    public Post() {
        super();
        this.likes = new HashSet<>();
        this.images = new ArrayList<>();
        this.replies = new HashSet<>();
        this.reposts = new HashSet<>();
        this.stars = new HashSet<>();
        this.views = new HashSet<>();
    }

    public Boolean isReply() {
        if (isReply == null)
            return false;
        return isReply;
    }


    @Override   // so sánh 2 obj Post dựa vào postedDate,
    //    sắp xếp theo thứ tự giảm dần của postedDate (mới nhất lên đầu).
    public int compareTo(Post o) {
        return -this.postedDate.compareTo(o.postedDate);
    }
}