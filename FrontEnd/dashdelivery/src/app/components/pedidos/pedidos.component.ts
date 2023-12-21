import { Component } from '@angular/core';
import { Pedido } from '../../models/Pedido';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
    pedido: Pedido = {
    nomeCliente: '',
    enderecoCliente: '',
    itens: '',
    total: 0
};

  btnCadastro: boolean = true;
  pedidos: Pedido[] = [];

  constructor(private service: PedidoService) {}

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): void {
    this.service.selecionar()
      .subscribe(retorno => this.pedidos = retorno);
  }

  selecionarPedido(posicao: number): void {
    this.pedido = this.pedidos[posicao];
    this.btnCadastro = false;
  }

  editar(): void {
    this.service.editar(this.pedido)
      .subscribe(retorno => {
        const posicao = this.pedidos.findIndex(obj => obj === retorno);
        if (posicao !== -1) {
          this.pedidos[posicao] = retorno;
          alert('Pedido editado com sucesso');
        }
        this.btnCadastro = true;

      });
  }


  cancelar(): void {

    this.btnCadastro = true;
  }
}
