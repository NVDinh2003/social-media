package com.nvd.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "poll_choices")
public class PollChoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer pollChoiceId;

    @ManyToOne
    @JoinColumn(name = "poll_id")
    @JsonIgnore
    private Poll poll;

    @Column(name = "poll_choice_text")
    private String choiceText;

    @OneToMany
    Set<ApplicationUser> votes;

    @Override
    public String toString() {
        return "PollChoice{" +
                "pollChoiceId=" + pollChoiceId +
                ", poll=" + poll.getPollId() +
                ", choiceText='" + choiceText + '\'' +
                ", votes=" + votes +
                '}';
    }
}
