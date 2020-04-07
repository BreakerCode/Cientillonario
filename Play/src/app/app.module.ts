import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { InicioComponent } from './inicio/inicio.component';
import { Credenciales } from './credenciales';
import { PreguntasService } from './preguntas/preguntas.service';
import { Preguntas } from './preguntas/preguntas';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'pregunta/:id', component: PreguntasComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PreguntasComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PreguntasService, Credenciales, Preguntas],
  bootstrap: [AppComponent]
})
export class AppModule { }
