
import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/Produtos';
import { ProdutoService } from '../../services/produto.service';
import { Categoria } from '../../models/Categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  produto = new Produto();
  btnCadastro: boolean = true;
  produtos: Produto[] = [];
  exibirModal = false; // Controle do modal
  categorias: Categoria[] = [];
  categoria: Categoria = new Categoria();
  categoriaSelecionada: number | null = null;

  constructor(private service: ProdutoService,  private categoriaService: CategoriaService) {}

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
    this.carregarCategorias();
  }

  cadastrar(): void {

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

  private formatarPreco(): void {
    if (this.produto.preco !== undefined && this.produto.preco !== null) {
      this.produto.preco = parseFloat(this.produto.preco.toFixed(2));
    }
  }

  carregarCategorias(): void {
    this.categoriaService.selecionar().subscribe(
      (data) => this.categorias = data,
      (error) => console.error(error)
    );
  }

  abrirModal(): void {
    this.exibirModal = true;
  }

  fecharModal(): void {
    this.exibirModal = false;
  }

  selecionarCategoria(id: number): void {
    this.categoriaSelecionada = id;
  }
  criarCategoria(): void {
    this.categoriaService.cadastrar(this.categoria).subscribe({
      next: (novaCategoria) => {
        this.categorias.push(novaCategoria);
        this.categoria = new Categoria();
        alert('Categoria criada com sucesso: ' + novaCategoria.nomeCategoria);
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao criar categoria');
      }
    });
  }

  removerCategoria(idCategoria: number): void {
    this.categoriaService.remover(idCategoria).subscribe({
      next: () => {
        this.categorias = this.categorias.filter(
          (cat) => cat.id !== idCategoria
        );
        alert('Categoria removida com sucesso');
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao remover categoria');
      }
    });
  }
}
