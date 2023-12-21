package com.dashdelivery.DashDelivery.Controllers;


import com.dashdelivery.DashDelivery.Dtos.AuthetinticationDto;
import com.dashdelivery.DashDelivery.Dtos.RegisterDto;
import com.dashdelivery.DashDelivery.Models.Produtos;
import com.dashdelivery.DashDelivery.Models.Usuarios;
import com.dashdelivery.DashDelivery.Services.AuthorizationService;
import com.dashdelivery.DashDelivery.Services.UsuariosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import org.springframework.beans.factory.annotation.Autowired;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    AuthorizationService authorizationService;
    @Autowired
    UsuariosService usuariosService;
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid AuthetinticationDto authetinticationDto){
        return authorizationService.login(authetinticationDto);
    }


    @PostMapping("/register")
    public ResponseEntity<Object> register (@RequestBody RegisterDto registerDto){
        return authorizationService.register(registerDto);
    }


    @GetMapping("/load")
    public List<Usuarios> getAllUsers() {
        return usuariosService.getAllUsers();
    }
}