import { atividade } from "./atividade.d";
import { typeSelectOptions } from "./select.d";
import { usuario } from "./usuario.d";

export type projeto = {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: typeSelectOptions;
  prioridadeId: number
  dataCadastro: Date,
  totalHrsAtividade?: number;
  participantes?: Array<usuario>;
  atividades?: Array<atividade>;
};

export type projetoFiltrosListagem = {
  pesquisa?: string;
  segmentoId: number;
  segmento?: typeSelectOptions;
}