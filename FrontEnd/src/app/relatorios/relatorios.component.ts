import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  
  tipoUsuario!: string;
  tecnicoEncontrado: any;
  empresaEncontrada: any;

  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}


  ngOnInit() {
    this.tipoUsuario = history.state.tipoUsuario;
    console.log('dashboard' + this.tipoUsuario)
    
    if (this.tipoUsuario && this.tipoUsuario.length === 11) {
      this.tecnicoEncontrado = this.authService.getTecnicoEncontrado();

  } 
  if  (this.tipoUsuario && this.tipoUsuario.length === 14) {
    this.empresaEncontrada = this.authService.getEmpresaEncontrada();

  }


}
}
