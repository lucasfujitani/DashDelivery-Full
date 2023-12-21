import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Entregador } from '../models/Entregador';

@Injectable({
  providedIn: 'root'
})
export class EntregadorService {

  private url:string = 'http://localhost:8090/entregador/'

  constructor(private http:HttpClient) { }

  selecionar():Observable<Entregador[]>{
 return this.http.get<Entregador[]>(this.url);
  }

  cadastrar(obj:Entregador):Observable<Entregador>{
    return this.http.post<Entregador>(this.url, obj);
  }

  editar(obj:Entregador):Observable<Entregador>{
    return this.http.put<Entregador>(this.url, obj);
  }

  remover(id: number):Observable<void>{
    return  this.http.delete<void>(this.url + id)
  }

}
