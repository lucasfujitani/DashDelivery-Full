package com.dashdelivery.DashDelivery.Models;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
public class Produtos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String produto;
    private String descricao;
    private BigDecimal preco;
    private String categoria;
    private String imagemUrl;

}
