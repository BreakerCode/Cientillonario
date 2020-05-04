import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { FormularioPreguntasComponent } from './components/formulario-preguntas/formulario-preguntas.component';
import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES: Routes = [
  {path: 'preguntas', component: PreguntasComponent, canActivate: [ AuthGuard ]},
  {path: 'ajustes', component: AjustesComponent, canActivate: [ AuthGuard ]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'preguntas/form', component: FormularioPreguntasComponent, canActivate: [ AuthGuard ]},
  {path: 'preguntas/form/:id', component: FormularioPreguntasComponent, canActivate: [ AuthGuard ]},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
