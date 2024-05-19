import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsFinalizacaoDTO } from '../models/FormsFinalizacaoDTO';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  private urlTec = 'http://localhost:8080/git/form-finalizacao';

  constructor(private http: HttpClient) { }

  saveTec(tecnicoData: FormData): Observable<any> {
    return this.http.post(this.urlTec, tecnicoData);
  }
}
