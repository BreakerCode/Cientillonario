import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ExplicacionComponent } from './components/explicacion/explicacion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { PreguntasService } from './services/preguntas.service';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'pregunta', component: PreguntasComponent},
  {path: 'explicacion', component: ExplicacionComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PreguntasComponent,
    InicioComponent,
    ExplicacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PreguntasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
