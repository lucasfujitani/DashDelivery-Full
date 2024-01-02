import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../models/Pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url:string = 'http://localhost:8090/pedidos/'
  constructor(private http:HttpClient) { }

  selecionar():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.url);
     }

    editar(obj:Pedido):Observable<Pedido>{
      return this.http.put<Pedido>(this.url, obj);
    }

    remover(id: number):Observable<void>{
      return  this.http.delete<void>(this.url + id)
    }
    cadastrar(obj: Pedido): Observable<Pedido> {
      return this.http.post<Pedido>(this.url, obj);
    }

    atualizarStatusPedido(pedido: Pedido): Observable<Pedido> {
      const urlAtualizacao = `${this.url}${pedido.id}`;
      return this.http.put<Pedido>(urlAtualizacao, pedido);
    }

}
