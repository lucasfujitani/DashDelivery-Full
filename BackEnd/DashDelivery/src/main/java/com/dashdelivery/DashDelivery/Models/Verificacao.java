package com.dashdelivery.DashDelivery.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Entity
public class Verificacao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @Column(nullable = false)
    private String email;

    private LocalDateTime timestamp;

    @Column(nullable = false)
    private String codigo;


    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

}
