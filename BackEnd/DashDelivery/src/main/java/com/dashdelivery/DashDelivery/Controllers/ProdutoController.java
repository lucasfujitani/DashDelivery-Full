package com.dashdelivery.DashDelivery.Controllers;


import com.dashdelivery.DashDelivery.Models.Produtos;
import com.dashdelivery.DashDelivery.Repositories.ProdutosRepositorio;
import com.dashdelivery.DashDelivery.Services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutosRepositorio produtosRepositorio;

    @Autowired
    private ProdutoService produtoService;

    @PostMapping("/")
    public Produtos cadastrar(@RequestBody Produtos c){
        return produtosRepositorio.save(c);
    }


    @GetMapping("/")
    public Iterable<Produtos> selecionar(){
        return  produtosRepositorio.findAll();
    }


    @PutMapping("/")
    public Produtos editar(@RequestBody Produtos c){
        return produtosRepositorio.save(c);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable long id){
    produtosRepositorio.deleteById(id);
    }
}
