import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explicacion',
  templateUrl: './explicacion.component.html',
  styleUrls: ['./explicacion.component.css']
})
export class ExplicacionComponent implements OnInit {

  usuario: string;

  constructor() { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
  }

}
