import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Chamados } from 'src/app/models/chamado';
import { ConsultasService } from '../consultas.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-tabela-tecnico',
  templateUrl: './tabela-tecnico.component.html',
  styleUrls: ['./tabela-tecnico.component.css']
})
export class TabelaTecnicoComponent implements OnInit {
  
  chamados: Observable<Chamados[]>;
  empresas:any[] =[];
  tecnicos: any[] = [];


  constructor(
    private consultaService: ConsultasService,
    private http: HttpClient,
    private auth: AuthService

  ){
   
    this.chamados = this.consultaService.list();
    console.log(this.chamados)
  };

  
  displayedColumns = ['numeroChamado', 'cidade', 'bairro', 'empresa', 'acoes' ]

  ngOnInit(): void {
    const tecLogado = this.auth.getTecnicoEncontrado();
    console.log('Empresa encontrada:', tecLogado);

    this.http.get<any>('http://localhost:8080/empresas').subscribe(
      (data: any) => {
        this.empresas = data;
        console.log(this.empresas);
        
        this.chamados.subscribe((chamados: Chamados[]) => {
          chamados.forEach((chamado: Chamados) => {
            const empresaEncontrada = this.empresas.find(empresa => empresa.id === chamado.empresa);
            if (empresaEncontrada) {
              chamado.empresa = empresaEncontrada.nome; // 
            }
          });
  
          // Filtrar chamados com status ENCERRADO e pertencentes à tecnico logado
          let chamadosFiltrados = chamados.filter(chamado => chamado.status !== 2 && chamado.tecnico === tecLogado.id);
  
          // Ordenar chamados por status
          chamadosFiltrados = chamadosFiltrados.sort((a, b) => {
            if (a.status === 0 && b.status !== 0) {
              return -1;
            } else if (a.status !== 0 && b.status === 0) {
              return 1;
            } else {
              return 0;
            }
          });
  
          this.chamados = of(chamadosFiltrados);
        });
      },
      (error: any) => {
        console.error('Erro ao carregar lista de empresas:', error);
      }
    );
  }
  
  

  getButtonColor(status: number): string {
    switch (status) {
      case 0: return 'warn';
      case 1: return 'primary';
      case 2: return 'primary';
      default: return '';
    }
  }

  getButtonLabel(status: number): string {
    switch (status) {
      case 0: return 'Á FAZER';
      case 1: return 'ADAPTAR';
      case 2: return 'ENCERRADO';
      default: return '';
    }
  }

}

  