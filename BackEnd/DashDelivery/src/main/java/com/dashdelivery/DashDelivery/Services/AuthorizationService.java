package com.dashdelivery.DashDelivery.Services;

import com.dashdelivery.DashDelivery.Dtos.AuthetinticationDto;
import com.dashdelivery.DashDelivery.Dtos.LoginResponseDto;
import com.dashdelivery.DashDelivery.Dtos.RegisterDto;
import com.dashdelivery.DashDelivery.Models.Usuarios;
import com.dashdelivery.DashDelivery.Repositories.UsuariosRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;

import java.util.Date;

@Service
public class AuthorizationService implements UserDetailsService{
    @Autowired
    private ApplicationContext context;

    @Autowired
    private UsuariosRepositorio userRepository;

    @Autowired
    private TokenService tokenService;

    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<Object> login(@RequestBody @Valid AuthetinticationDto data){
        authenticationManager = context.getBean(AuthenticationManager.class);

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((Usuarios) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDto(token));
    }


    public ResponseEntity<Object> register (@RequestBody RegisterDto registerDto){
        if (this.userRepository.findByEmail(registerDto.email()) != null ) return ResponseEntity.badRequest().build();
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDto.password());

        Usuarios newUser = new Usuarios(registerDto.email(), encryptedPassword, registerDto.role());
        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();
    }




}