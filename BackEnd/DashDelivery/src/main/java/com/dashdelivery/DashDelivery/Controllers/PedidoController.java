package com.dashdelivery.DashDelivery.Controllers;

import com.dashdelivery.DashDelivery.Models.Pedido;
import com.dashdelivery.DashDelivery.Models.Produtos;
import com.dashdelivery.DashDelivery.Repositories.PedidoRepositorio;
import com.dashdelivery.DashDelivery.Repositories.ProdutosRepositorio;
import com.dashdelivery.DashDelivery.Services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;


    @PostMapping("/")
    public Pedido cadastrar(@RequestBody Pedido c){
        return  pedidoRepositorio.save(c);
    }


    @GetMapping("/")
    public Iterable<Pedido> selecionar(){
        return   pedidoRepositorio.findAll();
    }


    @PutMapping("/")
    public Pedido editar(@RequestBody Pedido c){
        return  pedidoRepositorio.save(c);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable long id){
        pedidoRepositorio.deleteById(id);
    }
}
