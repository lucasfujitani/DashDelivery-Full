package com.dashdelivery.DashDelivery.Services;

import com.dashdelivery.DashDelivery.Models.Usuarios;
import com.dashdelivery.DashDelivery.Repositories.UsuariosRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosService {

    private final UsuariosRepositorio userRepository;
    @Autowired
    public UsuariosService(UsuariosRepositorio userRepository) {
        this.userRepository = userRepository;
    }

    public List<Usuarios> getAllUsers() {
        return userRepository.findAll();
    }
}
