package com.nvd.dto.response;

import com.nvd.models.ApplicationUser;
import com.nvd.models.Image;
import com.nvd.models.Poll;
import com.nvd.models.Post;
import com.nvd.models.enums.Audience;
import com.nvd.models.enums.ReplyRestriction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//           implements interface Comparable kiểu Post. Cho phép các obj Post có thể so sánh với nhau.
public class PostDTO implements Comparable<PostDTO> {
    private Integer postId;
    private String content;
    private LocalDateTime postedDate;
    private ApplicationUser author;
    private Set<ApplicationUser> likes;
    private List<Image> images;
    private Boolean isReply;
    private Integer replyTo;
    private Set<Post> replies;
    private Set<ApplicationUser> reposts;
    private Set<ApplicationUser> bookmarks;
    private Set<Integer> views;
    private boolean scheduled;
    private LocalDateTime scheduledDate;
    private Audience audience;
    private ReplyRestriction replyRestriction;
    private Poll poll;
    private String address;
    private String provinceCode;
    private String districtCode;
    private String wardCode;

    public Boolean isReply() {
        if (isReply == null)
            return false;
        return isReply;
    }

    @Override       // so sánh 2 obj Post dựa vào postedDate,
    //    sắp xếp theo thứ tự giảm dần của postedDate (mới nhất lên đầu).
    public int compareTo(PostDTO o) {
        return -this.postedDate.compareTo(o.postedDate);
    }

}
