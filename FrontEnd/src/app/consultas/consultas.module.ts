import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaTecnicoComponent } from './consulta-tecnico/consulta-tecnico.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';

import { CadastroModule } from '../cadastro/cadastro.module';
import { ConsultaEmpresaComponent } from './consulta-empresa/consulta-empresa.component';
import { ConsultaRoutingModule } from './consultas.routing.module';
import { TabelaEmpresaComponent } from './tabela-empresa/tabela-empresa.component';
import { TabelaTecnicoComponent } from './tabela-tecnico/tabela-tecnico.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    ConsultaTecnicoComponent,
    ConsultaEmpresaComponent,
    TabelaEmpresaComponent,
    TabelaTecnicoComponent,

    
  ],

  exports:[
    ConsultaTecnicoComponent,
    ConsultaEmpresaComponent,
    TabelaEmpresaComponent,
    TabelaTecnicoComponent,


  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ConsultaRoutingModule,
    CadastroModule,
    FormsModule,
    MatTableModule,
    
    
  ]
})
export class ConsultasModule { }
