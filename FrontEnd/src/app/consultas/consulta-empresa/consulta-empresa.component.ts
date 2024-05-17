import { Component, OnInit } from '@angular/core';
import { Chamados } from 'src/app/models/chamado';
import { Endereco } from 'src/app/models/endereco';
import { ConsultasService } from '../consultas.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaDTOinput } from 'src/app/models/empresa-dtoinput';
import { AuthService } from 'src/app/login/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consulta-empresa',
  templateUrl: './consulta-empresa.component.html',
  styleUrls: ['./consulta-empresa.component.css']
})
export class ConsultaEmpresaComponent implements OnInit {

  tipoUsuario?: string;
  empresaEncontrada?: EmpresaDTOinput;

  constructor(private route: ActivatedRoute,
  private authService: AuthService,
  
) {}

  ngOnInit() {
        
    this.empresaEncontrada = this.authService.getEmpresaEncontrada();
    console.log(this.empresaEncontrada);
    this.tipoUsuario = history.state.tipoUsuario;
  }




}