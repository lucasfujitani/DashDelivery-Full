package com.dashdelivery.DashDelivery.Repositories;

import com.dashdelivery.DashDelivery.Models.Produtos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ProdutosRepositorio extends CrudRepository<Produtos, Long> {
}
