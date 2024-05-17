import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  tecnicoEncontrado: any;
  empresaEncontrada: any;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string): Observable<any> {
    const body = { email: email };

    return this.http.post<any>('http://localhost:8080/login', body).pipe(
      tap(data => console.log('Resposta do login:', data)),
      map(response => {
        this.tecnicoEncontrado = response;
        this.empresaEncontrada = response;

         if (this.tecnicoEncontrado) {
           this.router.navigate(['/dashboard', this.tecnicoEncontrado.id]);
         } else if (this.empresaEncontrada) {
           this.router.navigate(['/dashboard', this.empresaEncontrada.id]);
         }

        return [response];
      })
    );
  }

  getTecnicoEncontrado() {
    return this.tecnicoEncontrado;
  }
  
  getEmpresaEncontrada() {
    return this.empresaEncontrada;
  }
}