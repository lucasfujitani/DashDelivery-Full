import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/Produtos';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/Pedido';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {
  formaDePagamento: string = '';
  nomeCliente: string = '';
  enderecoCliente: string = '';
  produtos: Produto[] = [];
  carrinho: Produto[] = [];
  exibirModal: boolean = false;

  constructor(private produtoService: ProdutoService, private pedidoService: PedidoService) {}

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): void {
    this.produtoService.selecionar()
      .subscribe(retorno => this.produtos = retorno);
  }

  adicionarAoPedido(produto: Produto) {
    this.carrinho.push({...produto, quantidade: produto.quantidade || 1});
    alert('Produto adicionado ao carrinho');
  }

  removerItem(index: number) {
    this.carrinho.splice(index, 1);
  }

  calcularTotal(): number {
    return this.carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
  }

  abrirModal() {
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
  }

  enviarPedidoWhatsApp() {
    let mensagem = `Pedido de: ${this.nomeCliente}\nEndereço: ${this.enderecoCliente}\n\nProdutos:\n`;
    let total = 0;

    this.carrinho.forEach(produto => {
      let subtotal = produto.preco * produto.quantidade;
      total += subtotal;
      mensagem += `${produto.produto}, Quantidade: ${produto.quantidade}, Subtotal: ${subtotal.toFixed(2)}\n`;
    });

    mensagem += `\nTotal da Compra: ${total.toFixed(2)}`;

    let whatsappUrl = `https://wa.me/554391674288?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  }
  enviarPedido() {

    if (!this.nomeCliente || !this.enderecoCliente || !this.formaDePagamento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const obj: Pedido = {
      id: 0,
      nomeCliente: this.nomeCliente,
      enderecoCliente: this.enderecoCliente,
      itens: JSON.stringify(this.carrinho.map(produto => ({
        nomeProduto: produto.produto,
        quantidade: produto.quantidade,
        preco: produto.preco
      }))),
      total: this.calcularTotal(),
      status: 'Aguardando',
      formaDePagamento: this.formaDePagamento
    };

    this.pedidoService.cadastrar(obj).subscribe(
      response => {
        alert('Pedido cadastrado com sucesso');
        this.limparPedido();
      },
      error => {
        console.error('Erro ao enviar pedido', error);
        alert('Erro ao cadastrar pedido');
      }
    );
  }

  limparPedido() {
    this.nomeCliente = '';
    this.enderecoCliente = '';
    this.carrinho = [];
    this.fecharModal();
  }

  incrementarQuantidade(produto: Produto) {
    if (!produto.quantidade) {
      produto.quantidade = 0;
    }
    produto.quantidade++;
  }

  decrementarQuantidade(produto: Produto) {
    if (produto.quantidade && produto.quantidade > 0) {
      produto.quantidade--;
    }
  }

}
