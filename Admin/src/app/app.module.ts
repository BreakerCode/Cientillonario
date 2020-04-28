import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { FormularioPreguntasComponent } from './components/formulario-preguntas/formulario-preguntas.component';
import { LoginComponent } from './components/login/login.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';

const routes: Routes = [
  {path: 'preguntas', component: PreguntasComponent},
  {path: 'ajustes', component: AjustesComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'preguntas/form', component: FormularioPreguntasComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    FormularioPreguntasComponent,
    LoginComponent,
    PreguntasComponent,
    AjustesComponent,
    NavegacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
