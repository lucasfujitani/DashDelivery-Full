package com.dashdelivery.DashDelivery.Repositories;

import com.dashdelivery.DashDelivery.Models.Verificacao;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface VerificacaoRepositorio extends CrudRepository<Verificacao, Long> {
    List<Verificacao> findByEmail(String email);
}
