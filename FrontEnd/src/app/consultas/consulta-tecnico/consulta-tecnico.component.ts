import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import { TecnicoDtoinput } from 'src/app/models/tecnico-dtoinput';


@Component({
  selector: 'app-consulta-tecnico',
  templateUrl: './consulta-tecnico.component.html',
  styleUrls: ['./consulta-tecnico.component.css']
})
export class ConsultaTecnicoComponent {


  
  tecnicoEncontrado?:TecnicoDtoinput ;
  tipoUsuario?: string;


  constructor(private route: ActivatedRoute,
  private authService: AuthService,

  ) {}

   ngOnInit() {
    
    this.tecnicoEncontrado = this.authService.getTecnicoEncontrado();
    console.log(this.tecnicoEncontrado);
    this.tipoUsuario = history.state.tipoUsuario;

   }
    
   
}  



