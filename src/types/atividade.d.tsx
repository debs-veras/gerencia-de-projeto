import { usuario } from "./usuario.d";

export type atividade = {
  id: number;
  titulo: string;
  descricao: string;
  horarioInicio: string;
  horarioFim: string;
  idParticipante: number;
  participante: usuario;
};
