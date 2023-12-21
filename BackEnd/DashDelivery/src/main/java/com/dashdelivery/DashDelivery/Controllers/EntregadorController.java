package com.dashdelivery.DashDelivery.Controllers;

import com.dashdelivery.DashDelivery.Models.Entregador;
import com.dashdelivery.DashDelivery.Repositories.EntregadorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("entregador")
@CrossOrigin(origins = "*")
public class EntregadorController {

    @Autowired
    private EntregadorRepositorio entregadorRepositorio;

    @PostMapping("/")
    public Entregador cadastrar (@RequestBody Entregador c){return entregadorRepositorio.save(c);}

    @GetMapping("/")
    public  Iterable<Entregador> selecionar(){return entregadorRepositorio.findAll();}

    @PutMapping("/")
    public  Entregador editar (@RequestBody Entregador c){return entregadorRepositorio.save(c);}

    @DeleteMapping("/{id}")
    public void remover (@PathVariable long id){entregadorRepositorio.deleteById(id);}

}