package com.dashdelivery.DashDelivery.Services;

import com.dashdelivery.DashDelivery.Models.Produtos;
import com.dashdelivery.DashDelivery.Repositories.ProdutosRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutosRepositorio produtoRepository;
    public Optional<Produtos> getProdutoById(Long id) {
        return produtoRepository.findById(id);
    }

}