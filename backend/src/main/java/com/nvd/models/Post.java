package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nvd.models.enums.Audience;
import com.nvd.models.enums.ReplyRestriction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.*;

@Entity
@Data
@AllArgsConstructor
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Integer postId;

    @Column(length = 256, nullable = false)
    private String content;

    @Column(name = "posted_date")
    private Date postedDate;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private ApplicationUser author;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_likes_junction",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> likes;


    @OneToMany
    private List<Image> images;

    //TODO: Figure out video upload

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_reply_juntion",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "reply_id")
    )
    @JsonIgnore
    private Set<Post> replies;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_repost_juntion",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> reposts;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_bookmark_juntion",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> bookmarks;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "post_view_juntion",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<ApplicationUser> views;

    private boolean scheduled;
    @Column(name = "scheduled_date")
    private Date scheduledDate;

    @Enumerated(EnumType.ORDINAL)   // lưu dạng số nguyên, thứ tự (ordinal) của enum đó trong định nghĩa
    private Audience audience;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "reply_restriction")
    private ReplyRestriction replyRestriction;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "poll_id", referencedColumnName = "poll_id")
    private Poll poll;

    public Post() {
        super();
        this.likes = new HashSet<>();
        this.images = new ArrayList<>();
        this.replies = new HashSet<>();
        this.reposts = new HashSet<>();
        this.bookmarks = new HashSet<>();
        this.views = new HashSet<>();
    }
}
