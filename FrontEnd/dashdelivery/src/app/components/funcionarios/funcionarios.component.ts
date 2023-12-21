import { FuncionarioService } from './../../services/funcionario.service';
import { Component } from '@angular/core';
import { Funcionario } from '../../models/Funcionarios';


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrl: './funcionarios.component.css'
})
export class FuncionariosComponent {
 funcionario = new Funcionario;

  btnCadastro:boolean = true;

  funcionarios:Funcionario[] = [];

constructor(private service:FuncionarioService){}

  selecionar():void{
    this.service.selecionar()
    .subscribe(retorno => this.funcionarios = retorno);
  }

  selecionarFuncionario(posicao:number):void{

    this.funcionario = this.funcionarios[posicao];
    this.btnCadastro = false;

  }
  editar():void{
    this.service.editar(this.funcionario)
    .subscribe(retorno => {

      let posicao = this.funcionarios.findIndex(obj  => {
        return obj.id == retorno.id;
      });

      this.funcionarios[posicao] = retorno;

      this.btnCadastro = true;

      alert('Funcionario Editado com sucesso')
      this.funcionario = new Funcionario();
    });
  }


  remover():void{
    this.service.remover(this.funcionario.id)
    .subscribe(retorno => {

      let posicao = this.funcionarios.findIndex(obj  => {
        return obj.id == this.funcionario.id;
      });

      this.funcionarios.splice(posicao, 1);

      this.btnCadastro = true;

      alert('Funcionario Editado com sucesso')

    });
  }
  ngOnInit(){
    this.selecionar();
  }

  cadastrar():void{
    this.service.cadastrar(this.funcionario)
    .subscribe(retorno => {this.funcionarios.push(retorno);

    this.funcionario = new Funcionario();

    alert('Funcionario cadastrado com sucesso')

    })

  }
  cancelar():void{
    this.funcionario = new Funcionario;
    this.btnCadastro = true;
  }


}

