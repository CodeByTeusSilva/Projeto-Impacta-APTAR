import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Chamado } from '../models/chamado.model'; // Crie este modelo conforme necessário
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private baseUrl = 'http://localhost:8080/chamados'; // URL do seu backend

  constructor(private http: HttpClient) { }

  getChamadoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createChamado(chamado: Chamado): Observable<any> {
    return this.http.post(`${this.baseUrl}`, chamado);
  }

  updateChamado(id: number, chamado: Chamado): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, chamado);
  }

  getChamadosByEmpresaId(empresaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/empresa/${empresaId}`);
  }

  getChamadosByTecnicoId(tecnicoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tecnico/${tecnicoId}`);
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep != null && !cep.isEmpty) {
      const validacep = /^[0-9]{5}-[0-9]{3}$/;
      return validacep.test(cep) ? null : {cepInvalido: true};
    }
    return null;
  }

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, "");
    if (cep !== "") {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json/`);
      }
    }
    return of({});
  }
  savecham(tecnicoData: Chamado): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.baseUrl, tecnicoData, {headers});
  }
}
