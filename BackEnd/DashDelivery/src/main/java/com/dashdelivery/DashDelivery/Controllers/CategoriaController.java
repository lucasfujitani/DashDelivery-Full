package com.dashdelivery.DashDelivery.Controllers;


import com.dashdelivery.DashDelivery.Models.Categoria;
import com.dashdelivery.DashDelivery.Models.Produtos;
import com.dashdelivery.DashDelivery.Repositories.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("categoria")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;


    @PostMapping("/")
    public Categoria cadastrar(@RequestBody Categoria c){
        return categoriaRepositorio.save(c);
    }


    @GetMapping("/")
    public Iterable<Categoria> selecionar(){
        return  categoriaRepositorio.findAll();
    }


    @PutMapping("/")
    public Categoria editar(@RequestBody Categoria c){
        return categoriaRepositorio.save(c);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable long id){
        categoriaRepositorio.deleteById(id);
    }
}
