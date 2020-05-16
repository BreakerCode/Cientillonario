export class Cuestionario {
  _id: string;
  publish: boolean = true;
  titulo: string;
  tiempo: number;
  modo: string;
  dificultad: string;
  preguntas: string[] = new Array<string>();
}
