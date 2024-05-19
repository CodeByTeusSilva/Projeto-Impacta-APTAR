import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulariosComponent } from './formularios.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: FormulariosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule]
})
export class FormulariosRoutingModule { }