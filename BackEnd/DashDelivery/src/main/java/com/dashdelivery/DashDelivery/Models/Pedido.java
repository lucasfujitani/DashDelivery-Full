package com.dashdelivery.DashDelivery.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;


@Data
@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;
    private String enderecoCliente;

    @Lob
    private String itens;
    private String formaDePagamento;
    private String status;

    private Double total;


}