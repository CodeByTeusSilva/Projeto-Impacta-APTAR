import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { FormularioDeEntregaTecnicosComponent } from './formulario-de-entrega-tecnicos/formulario-de-entrega-tecnicos.component';
import { AberturaDeChamadoEmpresaComponent } from './abertura-de-chamado-empresa/abertura-de-chamado-empresa.component';
import { FormulariosRoutingModule } from './formularios.routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FormularioDeEntregaTecnicosComponent,
    AberturaDeChamadoEmpresaComponent,
    
  ],
  exports: [
    FormularioDeEntregaTecnicosComponent,
    AberturaDeChamadoEmpresaComponent,
  ],


  imports: [
    CommonModule,
    AppMaterialModule,
    FormulariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule

    
    
  ]
})
export class FormulariosModule { }