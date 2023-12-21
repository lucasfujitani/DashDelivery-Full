package com.dashdelivery.DashDelivery.Controllers;

import com.dashdelivery.DashDelivery.Models.Funcionario;
import com.dashdelivery.DashDelivery.Repositories.FuncionarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("funcionarios")
@CrossOrigin(origins = "*")
public class FuncionarioController {

    @Autowired
    private FuncionarioRepositorio funcionarioRepositorio;

    @PostMapping("/")
    public Funcionario cadastrar (@RequestBody Funcionario c){return funcionarioRepositorio.save(c);}

    @GetMapping("/")
    public  Iterable<Funcionario> selecionar(){return funcionarioRepositorio.findAll();}

    @PutMapping("/")
    public  Funcionario editar (@RequestBody Funcionario c){return funcionarioRepositorio.save(c);}

    @DeleteMapping("/{id}")
    public void remover (@PathVariable long id){funcionarioRepositorio.deleteById(id);}

}