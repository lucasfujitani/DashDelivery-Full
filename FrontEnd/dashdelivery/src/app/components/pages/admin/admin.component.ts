import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  usuarios: any [] = [];
constructor(private http: HttpClient){
this.loadUsers();
}


loadUsers(){
  this.http.get('http://localhost:8090/auth/load').subscribe((res:any)=>{
  this.usuarios = res
  })
}

}
