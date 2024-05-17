import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { FlexLayoutModule } from '@angular/flex-layout';
import {CadastroModule} from "./cadastro/cadastro.module";
import {AppMaterialModule} from "./shared/app-material/app-material.module";
import { AuthService } from './login/auth.service';
import { ConsultasComponent } from './consultas/consultas.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormulariosComponent } from './formularios/formularios.component';
import { FormulariosModule } from './formularios/formulario.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultasModule } from './consultas/consultas.module';



@NgModule({
declarations: [
AppComponent,
HomeComponent,
DashboardComponent,
LoginComponent,
CadastroComponent,
ConsultasComponent,
FormulariosComponent

],
imports: [
BrowserModule,
AppRoutingModule,
BrowserAnimationsModule,
FormsModule,
ReactiveFormsModule,
HttpClientModule,
FlexLayoutModule,
AppRoutingModule,
CadastroModule,
FormulariosModule,
ConsultasModule,
AppMaterialModule,
MatInputModule,
MatTableModule,
MatToolbarModule,

],
exports: [],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
providers: [AuthService],
bootstrap: [AppComponent]
})
export class AppModule { }
