import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  senha: string = '';
  tipoUsuario: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    console.log('Chamando função de login');
    this.authService.login(this.email).subscribe(
      (res) => {
        console.log('Resposta do login recebida:', res);

        if (res && res.length > 0) {
          const usuario = res[0];
          console.log('Redirecionando para consulta');
          this.tipoUsuario = usuario.perfis && usuario.perfis.includes('TECNICO') ? 'TECNICO' : 'ADMIN';
          // Verifica se o usuário tem o perfil TECNICO
          if (usuario.perfis && usuario.perfis.includes('TECNICO')) {
            this.router.navigate(['/dashboard'], { state: { tipoUsuario: usuario.cpf } });
            console.log('usuario', this.tipoUsuario)
          } else {
            // Se não for TECNICO, assume-se que é ADMIN
            this.router.navigate(['/dashboard'], { state: { tipoUsuario: usuario.cnpj } });
            console.log('usuario', this.tipoUsuario)
          }
        } else {
          console.log('Nenhum usuário encontrado');
        }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
      }
    );
  }
  
}