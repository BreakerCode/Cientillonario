import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Rutas

import { APP_ROUTING } from './app.routes';


// Componentes
import { AppComponent } from './app.component';
import { FormularioPreguntasComponent } from './components/formulario-preguntas/formulario-preguntas.component';
import { LoginComponent } from './components/login/login.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PreguntasService } from './services/preguntas.service';
import { CuestionariosComponent } from './components/cuestionarios/cuestionarios.component';


@NgModule({
  declarations: [
    AppComponent,
    FormularioPreguntasComponent,
    LoginComponent,
    PreguntasComponent,
    AjustesComponent,
    NavegacionComponent,
    CuestionariosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [PreguntasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
