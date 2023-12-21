import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionarios';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {


  private url:string = 'http://localhost:8090/funcionarios/'

  constructor(private http:HttpClient) { }

  selecionar():Observable<Funcionario[]>{
 return this.http.get<Funcionario[]>(this.url);
  }

  cadastrar(obj:Funcionario):Observable<Funcionario>{
    return this.http.post<Funcionario>(this.url, obj);
  }

  editar(obj:Funcionario):Observable<Funcionario>{
    return this.http.put<Funcionario>(this.url, obj);
  }

  remover(id: number):Observable<void>{
    return  this.http.delete<void>(this.url + id)
  }

}
