import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import { FormTecnicoComponent } from './cadastro/form-tecnico/form-tecnico.component';
import { FormEmpresaComponent } from './cadastro/form-empresa/form-empresa.component';
import { ConsultaEmpresaComponent } from './consultas/consulta-empresa/consulta-empresa.component';
import { ConsultaTecnicoComponent } from './consultas/consulta-tecnico/consulta-tecnico.component';
import { FormularioDeEntregaTecnicosComponent } from './formularios/formulario-de-entrega-tecnicos/formulario-de-entrega-tecnicos.component';
import { AberturaDeChamadoEmpresaComponent } from './formularios/abertura-de-chamado-empresa/abertura-de-chamado-empresa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TabelaTecnicoComponent } from './consultas/tabela-tecnico/tabela-tecnico.component';
import { TabelaEmpresaComponent } from './consultas/tabela-empresa/tabela-empresa.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full'},
{ path: 'home', component: HomeComponent},
{path: 'dashboard',component: DashboardComponent},
{ path: 'login', component: LoginComponent},
{path: 'formularios', 
loadChildren: () => import('./formularios/formulario.module').then(m => m.FormulariosModule)},
{ path: 'cadastro',
loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule)
},
{path: 'formtecnico', component: FormTecnicoComponent},
{ path: 'formempresa', component: FormEmpresaComponent},
{path:'entrega', component: FormularioDeEntregaTecnicosComponent},
{path:'abertura', component: AberturaDeChamadoEmpresaComponent},


{ path: 'consultas', 
loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasModule)
},
{path: 'chamadotec', component:TabelaTecnicoComponent},
{path: 'chamadoemp', component:TabelaEmpresaComponent},
{ path: 'consultaEmpresa', component: ConsultaEmpresaComponent},
{ path: 'consultaTecnico', component: ConsultaTecnicoComponent},


]

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
