import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
loginObj: any={
    "email": "",
    "password": ""
  }

constructor(private http: HttpClient, private router: Router){}
onLogin(){
  debugger;
  this.http.post('http://localhost:8090/auth/login', this.loginObj).subscribe((res:any)=>{
  localStorage.setItem('loginToken', res.token)
  this.router.navigateByUrl('admin')
  })
}
}

