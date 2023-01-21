package com.vinay.boardgenie.bean;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @NotNull(message = "ID must not be NULL")
    private Long id;
    private String name;
    @Column(columnDefinition = "TEXT", length = 20480)
    private String description;

}
