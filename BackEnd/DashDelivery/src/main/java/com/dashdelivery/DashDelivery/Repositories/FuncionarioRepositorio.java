package com.dashdelivery.DashDelivery.Repositories;

import com.dashdelivery.DashDelivery.Models.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepositorio extends JpaRepository <Funcionario, Long> {
}
