export class Pregunta {
  _id: string;
  publish: boolean = true;
  pregunta: string;
  modo: string;
  categoria: string;
  respuestas: {respuesta: string, correcta: boolean}[] = [{respuesta:"", correcta:false},{respuesta:"", correcta:false},{respuesta:"", correcta:false},{respuesta:"", correcta:false}];
  pista: {pista: string, isImagen: boolean} = {pista:"", isImagen: null};
  explicacion: string;
}
