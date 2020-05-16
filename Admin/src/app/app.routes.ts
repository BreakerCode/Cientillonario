import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { FormularioPreguntasComponent } from './components/formulario-preguntas/formulario-preguntas.component';
import { AuthGuard } from './guards/auth.guard';
import { CuestionariosComponent } from './components/cuestionarios/cuestionarios.component';

const APP_ROUTES: Routes = [
  {path: 'preguntas', component: PreguntasComponent, canActivate: [ AuthGuard ]},
  {path: 'login', component: LoginComponent},
  {path: 'preguntas/form', component: FormularioPreguntasComponent, canActivate: [ AuthGuard ]},
  {path: 'preguntas/form/:id', component: FormularioPreguntasComponent, canActivate: [ AuthGuard ]},
  {path: 'cuestionarios', component: CuestionariosComponent, canActivate: [ AuthGuard ]},
  {path: 'cuestionarios/form', component: AjustesComponent, canActivate: [ AuthGuard ]},
  {path: 'cuestionarios/form/:id', component: AjustesComponent, canActivate: [ AuthGuard ]},
  {path: '**', redirectTo: '/preguntas', pathMatch: 'full'},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
