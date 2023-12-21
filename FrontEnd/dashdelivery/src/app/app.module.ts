import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { RouterModule } from '@angular/router';
import { FuncionariosComponent } from './components/funcionarios/funcionarios.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EntregadorComponent } from './components/entregador/entregador.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AdminInterceptor } from './admin.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardapioComponent,
    AdminComponent,
    ProdutosComponent,
    PedidosComponent,
    FuncionariosComponent,
    SidebarComponent,
    EntregadorComponent,
    AuthComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    RouterModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
