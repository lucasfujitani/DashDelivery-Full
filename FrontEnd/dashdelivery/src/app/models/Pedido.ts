export interface Pedido {
  id:number;
  nomeCliente: string;
  enderecoCliente: string;
  itens: string;
  total: number;
  status: string;
  formaDePagamento:string;

}


export interface ItemPedido {
  nomeProduto: string;
  quantidade: number;
  preco: number;
}
