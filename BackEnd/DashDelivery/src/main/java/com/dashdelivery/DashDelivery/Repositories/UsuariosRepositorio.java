package com.dashdelivery.DashDelivery.Repositories;

import com.dashdelivery.DashDelivery.Models.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuariosRepositorio extends JpaRepository<Usuarios, Long> {
UserDetails findByEmail(String email);



}
