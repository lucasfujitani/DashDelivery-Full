import { Component } from '@angular/core';
import { Entregador } from '../../models/Entregador';
import { EntregadorService } from '../../services/entregador.service';

@Component({
  selector: 'app-entregador',
  templateUrl: './entregador.component.html',
  styleUrl: './entregador.component.css'
})
export class EntregadorComponent {

  entregador = new Entregador;

  btnCadastro:boolean = true;

  entregadores:Entregador[] = [];

constructor(private service:EntregadorService){}

  selecionar():void{
    this.service.selecionar()
    .subscribe(retorno => this.entregadores = retorno);
  }

  selecionarEntregador(posicao:number):void{

    this.entregador = this.entregadores[posicao];
    this.btnCadastro = false;

  }
  editar():void{
    this.service.editar(this.entregador)
    .subscribe(retorno => {

      let posicao = this.entregadores.findIndex(obj  => {
        return obj.id == retorno.id;
      });

      this.entregadores[posicao] = retorno;

      this.btnCadastro = true;

      alert('Entregador Editado com sucesso')
      this.entregador = new Entregador();
    });
  }


  remover():void{
    this.service.remover(this.entregador.id)
    .subscribe(retorno => {

      let posicao = this.entregadores.findIndex(obj  => {
        return obj.id == this.entregador.id;
      });

      this.entregadores.splice(posicao, 1);

      this.btnCadastro = true;

      alert('Entregador Editado com sucesso')

    });
  }
  ngOnInit(){
    this.selecionar();
  }

  cadastrar():void{
    this.service.cadastrar(this.entregador)
    .subscribe(retorno => {this.entregadores.push(retorno);

    this.entregador = new Entregador();

    alert('Entregador cadastrado com sucesso')

    })

  }
  cancelar():void{
    this.entregador = new Entregador;
    this.btnCadastro = true;
  }


}

