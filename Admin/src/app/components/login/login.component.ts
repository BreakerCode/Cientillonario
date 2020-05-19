import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario-interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario: Usuario = {

    user: '',
    password: ''


  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async login(){

    if(this.usuario.user === ''){

        Swal.fire({
          allowOutsideClick: false,
          title: 'Ups..!',
          text: 'Introduzca el usuario!',
          icon: 'error'
      });

    } else if(this.usuario.password === ''){

        Swal.fire({
          allowOutsideClick: false,
          title: 'Ups..!',
          text: 'Introduzca la contraseña!',
          icon: 'error'
      });

    } else {


      await this.authService.login(this.usuario).then(respuesta =>{

        const token = respuesta;
        this.authService.guardarToken(token.token);
        this.router.navigateByUrl('/preguntas')

      }).catch(error => {

        Swal.fire({
          allowOutsideClick: false,
          title: 'Ups..!',
          text: 'Datos incorrectos!',
          icon: 'error'
        });

      });

    }

  }




}
