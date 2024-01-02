import { Component } from '@angular/core';
import { Produto } from '../../models/Produtos';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  produto = new Produto;
  btnCadastro: boolean = true;
  produtos: Produto[] = [];

  constructor(private service: ProdutoService) {}

  selecionar(): void {
    this.service.selecionar()
      .subscribe(retorno => this.produtos = retorno);
  }

  selecionarProduto(posicao: number): void {
    this.produto = this.produtos[posicao];
    this.btnCadastro = false;
  }

  editar(): void {
    this.formatarPreco();

    this.service.editar(this.produto)
      .subscribe(retorno => {
        let posicao = this.produtos.findIndex(obj => {
          return obj.id == retorno.id;
        });

        this.produtos[posicao] = retorno;

        this.btnCadastro = true;

        alert('Produto Editado com sucesso');
        this.produto = new Produto();
      });
  }

  remover(): void {
    this.service.remover(this.produto.id)
      .subscribe(retorno => {
        let posicao = this.produtos.findIndex(obj => {
          return obj.id == this.produto.id;
        });

        this.produtos.splice(posicao, 1);

        this.btnCadastro = true;

        alert('Produto Editado com sucesso');
      });
  }

  ngOnInit() {
    this.selecionar();
  }

  cadastrar(): void {
    // Formata o preço antes de enviar para o serviço
    this.formatarPreco();

    this.service.cadastrar(this.produto)
      .subscribe(retorno => {
        this.produtos.push(retorno);
        this.produto = new Produto();

        alert('Produto cadastrado com sucesso');
      });
  }

  cancelar(): void {
    this.produto = new Produto();
    this.btnCadastro = true;
  }

  // Função para formatar o preço do produto para o formato brasileiro
  private formatarPreco(): void {
    if (this.produto.preco !== undefined && this.produto.preco !== null) {
      this.produto.preco = parseFloat(this.produto.preco.toFixed(2));
    }
  }
}
