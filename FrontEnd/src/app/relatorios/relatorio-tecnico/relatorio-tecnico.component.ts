import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Chamados } from 'src/app/models/chamado';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/login/auth.service';
import { RelatoriosService } from 'src/app/services/relatorios.service';

@Component({
  selector: 'app-relatorio-tecnico',
  templateUrl: './relatorio-tecnico.component.html',
  styleUrls: ['./relatorio-tecnico.component.css']
})
export class RelatorioTecnicoComponent implements OnInit {
  
  chamados: Observable<Chamados[]>;
  empresas: any[] = [];
  tecnicos: any[] = [];

  displayedColumns = ['numeroChamado', 'cidade', 'bairro', 'empresa', 'acoes' ]

  constructor(
    private relatoriosService: RelatoriosService,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.chamados = this.relatoriosService.list();
    console.log(this.chamados);
  }

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
              chamado.empresa = empresaEncontrada.nome;
            }
          });
  
          // Remover a filtragem e ordenação específica por status
          // Atualizar diretamente o observable 'chamados' com todos os chamados
          this.chamados = of(chamados);
        });
      },
      (error: any) => {
        console.error('Erro ao carregar lista de empresas:', error);
      }
    );
  }

  getButtonColor(status: number): string {
    switch (status) {
      case 0: return 'accent';
      case 1: return 'yellow';
      case 2: return 'primary';
      default: return '';
    }
  }

  getButtonLabel(status: number): string {
    switch (status) {
      case 0: return 'Á ADAPTAR';
      case 1: return 'EM PREPARAÇÃO';
      case 2: return 'DOWNLOAD';
      default: return '';
    }
  }

  openReport(chamadoId: number): void {
    const url = `http://localhost:8080/reports/chamado/${chamadoId}`;
    window.open(url, '_blank');
  }
}
