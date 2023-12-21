import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    // Verifica se está no navegador antes de acessar localStorage
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('loginToken');
      if (token) {
        return true; // Usuário autenticado
      } else {
        this.router.navigate(['/login']); // Redirecionar para a página de login
        return false; // Acesso negado
      }
    }
    return false; // Acesso negado por padrão se não estiver no navegador
  }
}
