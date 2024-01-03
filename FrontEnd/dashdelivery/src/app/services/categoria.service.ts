import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url:string = 'http://localhost:8090/categoria/'

  constructor(private http:HttpClient) { }

  selecionar():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url);
     }

     cadastrar(obj:Categoria):Observable<Categoria>{
       return this.http.post<Categoria>(this.url, obj);
     }

     editar(obj:Categoria):Observable<Categoria>{
       return this.http.put<Categoria>(this.url, obj);
     }

     remover(id: number):Observable<any>{
       return  this.http.delete<any>(this.url + id)
     }

}
