package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Boolean reply;

    @Column(name = "reply_to")
    private Integer replyTo;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_reply_juntion",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "reply_id")
    )
//    @JsonIgnore
    private Set<Post> replies;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_repost_juntion",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> reposts;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_bookmark_juntion",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> bookmarks;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "post_view_juntion",
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
    @ManyToOne
    @JoinColumn(name = "post_province_id")
    Province province;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_district_id")
    District district;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_ward_id")
    Ward ward;

    public Post() {
        super();
        this.likes = new HashSet<>();
        this.images = new ArrayList<>();
        this.replies = new HashSet<>();
        this.reposts = new HashSet<>();
        this.bookmarks = new HashSet<>();
        this.views = new HashSet<>();
    }

    public Boolean getReply() {
        if (reply == null)
            return false;
        return reply;
    }

    @Override   // so sánh 2 obj Post dựa vào postedDate,
    //    sắp xếp theo thứ tự giảm dần của postedDate (mới nhất lên đầu).
    public int compareTo(Post o) {
        return -this.postedDate.compareTo(o.postedDate);
    }


}
