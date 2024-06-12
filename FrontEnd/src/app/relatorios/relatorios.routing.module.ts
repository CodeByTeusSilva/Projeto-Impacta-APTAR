import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosComponent } from './relatorios.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: RelatoriosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }