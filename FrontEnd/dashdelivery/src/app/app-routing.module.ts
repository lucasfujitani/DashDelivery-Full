import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { EntregadorComponent } from './components/entregador/entregador.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './services/auth-guard.service';




const routes: Routes = [
  { path: 'login', component: AuthComponent },

  {
    path: '',
    children: [
      { path: 'cardapio', component: CardapioComponent  },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      { path: 'produtos', component: ProdutosComponent , canActivate: [AuthGuard]},
      { path: 'pedidos', component: PedidosComponent , canActivate: [AuthGuard] },
      { path: 'funcionarios', component: FuncionariosComponent , canActivate: [AuthGuard]},
      { path: 'entregadores', component: EntregadorComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'cardapio', pathMatch: 'full' }
    ]
  },


  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
