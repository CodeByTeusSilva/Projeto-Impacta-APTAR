import { NgModule } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTabsModule} from "@angular/material/tabs";
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
exports:[
MatCardModule,
MatButtonModule,
MatToolbarModule,
MatFormFieldModule,
MatInputModule,
MatTabsModule,
FlexLayoutModule


]
})
export class AppMaterialModule { }
