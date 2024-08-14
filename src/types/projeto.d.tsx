import { atividade } from "./atividade.d";
import { usuario } from "./usuario.d";

export type projeto = {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: string;
  participantes?: Array<usuario>;
  atividades?: Array<atividade>;
};
