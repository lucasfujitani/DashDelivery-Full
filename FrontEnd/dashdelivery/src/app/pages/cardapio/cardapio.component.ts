import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/Produtos';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/Pedido';
import { Categoria } from '../../models/Categoria';
import { VerificationService } from '../../services/verification.service';
import { Verificacao } from '../../models/Verificacao';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  // Propriedades do Pedido
  formaDePagamento: string = '';
  nomeCliente: string = '';
  enderecoCliente: string = '';
  carrinho: Produto[] = [];
  verificacao: Verificacao = { email: '', codigo: '' };
  codigoValidado: boolean = false;
  exibirModal: boolean = false;

  // Propriedades de Produtos e Categorias
  produtos: Produto[] = [];
  categorias: Record<string, Produto[]> = {};
  termoDeBusca: string = '';
  categoriaDeBusca: string = '';
  categoriasFiltradas: Record<string, Produto[]> = {};

  // Propriedades de Endereço do Cliente
  ruaCliente: string = "";
  numeroResidencia: string = "";
  bairroCliente: string = "";
  cidadeCliente: string = "";
  ufCliente: string = "";
  cepCliente: string = "";

  constructor(
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private verificationService: VerificationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.selecionar();
  }

   // Seleciona produtos e agrupa por categoria
  selecionar(): void {
    this.produtoService.selecionar().subscribe(retorno => {
      this.produtos = retorno;
      this.agruparProdutosPorCategoria();
      this.categoriasFiltradas = this.categorias;
    });
  }

  // Adiciona um produto ao carrinho
  adicionarAoPedido(produto: Produto) {
    this.carrinho.push({...produto, quantidade: produto.quantidade || 1});
    alert('Produto adicionado ao carrinho');
  }

  // Remove um item do carrinho
  removerItem(index: number) {
    this.carrinho.splice(index, 1);
  }

  // Calcula o total do carrinho
  calcularTotal(): number {
    const total = this.carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
    return Number(total.toFixed(2));
  }

  // Abre o modal de pedido
  abrirModal() {
    this.exibirModal = true;
  }

  // Fecha o modal de pedido
  fecharModal() {
    this.exibirModal = false;
  }

  // Envia pedido pelo WhatsApp
  enviarPedidoWhatsApp() {
    let mensagem = `Pedido de: ${this.nomeCliente}\nEndereço: ${this.enderecoCompleto}\n\nProdutos:\n`;
    // Constrói a mensagem do pedido
    this.carrinho.forEach(produto => {

      mensagem += `${produto.produto}, Quantidade: ${produto.quantidade}\n`;
    });
    mensagem += `\nTotal da Compra: ${this.calcularTotal().toFixed(2)}`;
    let whatsappUrl = `https://wa.me/554391674288?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  }

  // Envia o pedido
  enviarPedido() {
    // Validação dos campos obrigatórios
    if (!this.nomeCliente || !this.formaDePagamento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Monta objeto do pedido
    const pedido: Pedido = {
      id: 0,
      nomeCliente: this.nomeCliente,
      enderecoCliente: this.enderecoCompleto,
      itens: JSON.stringify(this.carrinho.map(produto => ({
        nomeProduto: produto.produto,
        quantidade: produto.quantidade,
        preco: produto.preco.toFixed(2)
      }))),
      total: this.calcularTotal(),
      status: 'Aguardando',
      formaDePagamento: this.formaDePagamento
    };

    // Faz a requisição para cadastrar o pedido
    this.pedidoService.cadastrar(pedido).subscribe(
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

  // Limpa os dados do pedido
  limparPedido() {
    this.nomeCliente = '';
    this.enderecoCliente = '';
    this.carrinho = [];
    this.fecharModal();
  }

  // Incrementa a quantidade de um produto
  incrementarQuantidade(produto: Produto) {
    if (!produto.quantidade) {
      produto.quantidade = 0;
    }
    produto.quantidade++;
  }

  // Decrementa a quantidade de um produto
  decrementarQuantidade(produto: Produto) {
    if (produto.quantidade && produto.quantidade > 0) {
      produto.quantidade--;
    }
  }

  // Agrupa produtos por categoria
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

  // Filtra produtos com base em termos de busca e categoria
  filtrarProdutos() {
    if (!this.termoDeBusca && !this.categoriaDeBusca) {
      this.categoriasFiltradas = this.categorias;
      return;
    }

    this.categoriasFiltradas = Object.keys(this.categorias).reduce((acc, categoria) => {
      const produtosFiltrados = this.categorias[categoria].filter(produto =>
        produto.produto.toLowerCase().includes(this.termoDeBusca.toLowerCase()) &&
        (this.categoriaDeBusca === '' || produto.categoria === this.categoriaDeBusca)
      );

      if (produtosFiltrados.length > 0) {
        acc[categoria] = produtosFiltrados;
      }

      return acc;
    }, {} as Record<string, Produto[]>);
  }

  // Envia código de verificação
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

  // Valida o código de verificação
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

  // Retorna o endereço completo do cliente
  get enderecoCompleto(): string {
    return `${this.ruaCliente || ''}, ${this.numeroResidencia || ''}, ${this.bairroCliente || ''}, ${this.cidadeCliente || ''} - ${this.ufCliente || ''}`.trim();
  }

  // Consulta endereço pelo CEP
  consultarCep(cep: string) {
    cep = cep.replace(/\D/g, '');
    if (cep != "" && /^[0-9]{8}$/.test(cep)) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(dados => {
        if (!dados.erro) {
          this.ruaCliente = dados.logradouro;
          this.bairroCliente = dados.bairro;
          this.cidadeCliente = dados.localidade;
          this.ufCliente = dados.uf;
        } else {
          this.limparCamposEndereco();
          alert("CEP não encontrado.");
        }
      });
    } else {
      this.limparCamposEndereco();
      alert("Formato de CEP inválido.");
    }
  }

  // Limpa os campos de endereço
  private limparCamposEndereco() {
    this.ruaCliente = "";
    this.bairroCliente = "";
    this.cidadeCliente = "";
    this.ufCliente = "";
  }
}

