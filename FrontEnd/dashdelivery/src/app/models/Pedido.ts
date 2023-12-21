export interface Pedido {

  nomeCliente: string;
  enderecoCliente: string;
  itens: string;
  total: number;


}


export interface ItemPedido {
  nomeProduto: string;
  quantidade: number;
  preco: number;
}
