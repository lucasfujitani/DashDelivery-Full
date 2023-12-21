package com.dashdelivery.DashDelivery.Models;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
public class Funcionario{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cargo; //Cozinheiro, Caixa, Entregador
    private BigDecimal salario;

}
