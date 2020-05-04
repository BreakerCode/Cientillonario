export class Pregunta {
  _id: string;
  publish: boolean;
  pregunta: string;
  modo: string;
  categoria: string;
  respuestas: {respuesta: string, correcta: boolean}[];
  pista: string;
  explicacion: string;
}
