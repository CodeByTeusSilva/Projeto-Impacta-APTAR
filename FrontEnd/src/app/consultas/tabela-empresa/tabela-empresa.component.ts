import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../consultas.service';
import { Observable, of } from 'rxjs';
import { Chamados } from 'src/app/models/chamado';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-tabela-empresa',
  templateUrl: './tabela-empresa.component.html',
  styleUrls: ['./tabela-empresa.component.css']
})
export class TabelaEmpresaComponent implements OnInit {

  chamados: Observable<Chamados[]>;
  tecnicos: any[] = [];
  empresa: any[] = [];

  constructor(
    private consultaService: ConsultasService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.chamados = this.consultaService.list();
  }

  displayedColumns = ['numeroChamado', 'status', 'endereco', 'tecnico'];

  ngOnInit(): void {
    const empresaLogada = this.auth.getEmpresaEncontrada();
    console.log('Empresa encontrada:', empresaLogada);

    this.http.get<any>('http://localhost:8080/tecnicos').subscribe(
      (data: any) => {
        this.tecnicos = data;
        console.log(this.tecnicos);
      },
      (error: any) => {
        console.error('Erro ao carregar lista de técnicos:', error);
      }
    );

    this.chamados.subscribe((chamados: Chamados[]) => {
      chamados.forEach((chamado: Chamados) => {
        const tecnicoEncontrado = this.tecnicos.find(tecnico => tecnico.id === chamado.tecnico);
        if (tecnicoEncontrado) {
          chamado.tecnico =this.auth.tecnicoEncontrado.nome;
        }
      });

      // Filtrar chamados com status ENCERRADO e pertencentes à empresa logada
      let chamadosFiltrados = chamados.filter(chamado => chamado.status !== 2 && chamado.empresa === empresaLogada.id);

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
    },
    (error: any) => {
      console.error('Erro ao carregar lista de chamados:', error);
    });
  }

  
  getButtonColor(status: number): string {
    switch (status) {
      case 0: return 'accent';
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

