import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/Produtos';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/Pedido';
import { Categoria } from '../../models/Categoria';
import { VerificationService } from '../../services/verification.service';
import { Verificacao } from '../../models/Verificacao';

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
  categorias: Record<string, Produto[]> = {};
  termoDeBusca: string = '';
  categoriaDeBusca: string = '';
  categoriasFiltradas: Record<string, Produto[]> = {};
  verificacao: Verificacao = { email: '', codigo: '' };
  codigoValidado: boolean = false;
  exibirModal: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private verificationService: VerificationService
  ) {}

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): void {
    this.produtoService.selecionar().subscribe(retorno => {
      this.produtos = retorno;
      this.agruparProdutosPorCategoria();
      this.categoriasFiltradas = this.categorias;
    });
  }

  adicionarAoPedido(produto: Produto) {
    this.carrinho.push({...produto, quantidade: produto.quantidade || 1});
    alert('Produto adicionado ao carrinho');
  }

  removerItem(index: number) {
    this.carrinho.splice(index, 1);
  }

  calcularTotal(): number {
    const total = this.carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
    return Number(total.toFixed(2));
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
        preco: produto.preco.toFixed(2)
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


  agruparProdutosPorCategoria() {
    this.categorias = this.produtos.reduce((acc, produto) => {
      const categoria = produto.categoria || 'Outros';
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(produto);
      return acc;
    }, {} as Record<string, Produto[]>);
  }

  filtrarProdutos() {
    if (!this.termoDeBusca && !this.categoriaDeBusca) {
      this.categoriasFiltradas = this.categorias; // Se não há termo de busca, mostre todos
      return;
    }

    this.categoriasFiltradas = Object.keys(this.categorias).reduce((acc, categoria) => {
      const produtosFiltrados = this.categorias[categoria].filter(produto => {
        return produto.produto.toLowerCase().includes(this.termoDeBusca.toLowerCase()) &&
               (this.categoriaDeBusca === '' || produto.categoria === this.categoriaDeBusca);
      });

      if (produtosFiltrados.length > 0) {
        acc[categoria] = produtosFiltrados;
      }

      return acc;
    }, {} as Record<string, Produto[]>);
  }


  enviarCodigoDeVerificacao(): void {
    if (!this.verificacao.email) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    this.verificationService.sendCode(this.verificacao.email).subscribe({
      next: (response) => {
        alert('Código de verificação enviado para: ' + this.verificacao.email);
      },
      error: (error) => {
        console.error('Erro ao enviar código de verificação', error);
        alert('Erro ao enviar código de verificação. Verifique o console para mais detalhes.');
      }
    });
  }

  validarCodigoDeVerificacao(): void {
    if (!this.verificacao.email || !this.verificacao.codigo) {
      alert('Por favor, insira um e-mail e um código de verificação.');
      return;
    }

    this.verificationService.validateCode(this.verificacao.email, this.verificacao.codigo).subscribe({
      next: (response) => {
        this.codigoValidado = true;
        alert('Código validado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao validar código de verificação', error);
        this.codigoValidado = false;
        alert('Código de verificação inválido.');
      }
    });
  }
}
