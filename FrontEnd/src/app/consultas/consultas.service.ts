import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamados } from '../models/chamado';
import { tap } from 'rxjs';
import { TecnicoDtoinput } from '../models/tecnico-dtoinput';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private readonly APICHAMADO = 'http://localhost:8080/chamados';
  private readonly APITECNICO = 'http://localhost:8080/tecnicos';


  private usuario?: any;


  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Chamados[]>(this.APICHAMADO)
    .pipe(
      tap((chamados:any) => console.log(chamados))
    )
  }
  

  getUsuario(id: number){
    return this.httpClient.get<any>(`${this.APITECNICO}/${id}`)
    .pipe(
      tap((user) => console.log(user))     
    )
  }
}
