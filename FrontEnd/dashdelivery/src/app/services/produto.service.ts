import { Produto } from './../models/Produtos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url:string = 'http://localhost:8090/produtos/'

  constructor(private http:HttpClient) { }

  selecionar():Observable<Produto[]>{
 return this.http.get<Produto[]>(this.url);
  }

  cadastrar(obj:Produto):Observable<Produto>{
    return this.http.post<Produto>(this.url, obj);
  }

  editar(obj:Produto):Observable<Produto>{
    return this.http.put<Produto>(this.url, obj);
  }

  remover(id: number):Observable<void>{
    return  this.http.delete<void>(this.url + id)
  }


}
