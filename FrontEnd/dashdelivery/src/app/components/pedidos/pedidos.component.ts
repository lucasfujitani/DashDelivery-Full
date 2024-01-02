import { Component } from '@angular/core';
import { Pedido } from '../../models/Pedido';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  formaDePagamento: string = '';
    pedido: Pedido = {
    id: 0,
    nomeCliente: '',
    enderecoCliente: '',
    itens: '',
    total: 0,
    status: 'Aguardando',
    formaDePagamento: this.formaDePagamento
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
  atualizarStatusPedido(idPedido: number, event: Event) {
    const selectElement = event.target as HTMLSelectElement | null;

    if (selectElement) {
      const novoStatus = selectElement.value;
      const pedido = this.pedidos.find(p => p.id === idPedido);
      if (pedido) {
        pedido.status = novoStatus;

        this.service.editar(pedido).subscribe(
          () => console.log('Status do pedido atualizado com sucesso'),
          error => console.error('Erro ao atualizar o status do pedido', error)
        );
      }
    }
  }


  remover(idPedido: number): void {
    this.service.remover(idPedido)
      .subscribe(retorno => {
        let posicao = this.pedidos.findIndex(obj => obj.id == idPedido);
        if (posicao !== -1) {
          this.pedidos.splice(posicao, 1);
        }
      });
  }

  cancelar(): void {

    this.btnCadastro = true;
  }
}
