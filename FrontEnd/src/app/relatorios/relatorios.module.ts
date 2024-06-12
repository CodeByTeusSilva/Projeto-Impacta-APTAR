import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AppMaterialModule } from '../shared/app-material/app-material.module';



import { RelatoriosRoutingModule } from './relatorios.routing.module';
import { RelatorioTecnicoComponent } from './relatorio-tecnico/relatorio-tecnico.component';
import { RelatorioEmpresaComponent } from './relatorio-empresa/relatorio-empresa.component';






@NgModule({
  declarations: [
    RelatorioTecnicoComponent,
    RelatorioEmpresaComponent,
  ],

  exports:[
    RelatorioTecnicoComponent,
    RelatorioEmpresaComponent,


  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RelatoriosRoutingModule,
    FormsModule,
    MatTableModule,
    
    
  ]
})
export class RelatoriosModule { }
