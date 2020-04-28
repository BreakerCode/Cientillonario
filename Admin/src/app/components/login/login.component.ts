import { Component, OnInit } from '@angular/core';
import { Usuario, TokenUsuario } from '../../interfaces/usuario-interfaces';
import { format } from 'url';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: TokenUsuario;

  usuario: Usuario = {

    user: '',
    password: ''


  };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

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


      await this.usuarioService.login(this.usuario).then(respuesta =>{

        this.token = respuesta;
        console.log(this.token);
        this.router.navigateByUrl('/preguntas')

      }).catch(error => {

        Swal.fire({
          allowOutsideClick: false,
          title: 'Ups..!',
          text: 'Datos incorrectos!',
          icon: 'error'
        });

      });
      console.log('Token: ', this.token);

    }

  }




}
