import { baseFiltros } from "./baseEntity.d";
import { typeSelectOptions } from "./select.d";

export type usuarioCadastro = {
  id?: number;
  nome: string;
  email: string;
  ativo: boolean | null;
  perfilAcessoId: number | null;
  senha?: string;
  confirmacaoSenha?: string;
};

export type usuarioForm = {
  nome: string;
  email: string;
  ativo: boolean | null;
  perfilAcessoId: number | null;
  perfilAcesso: typeSelectOptions | null;
  descricaoPerfilAcesso: string;
  senha: string;
  confirmacaoSenha: string;
};

export type usuario = {
  id: number;
  nome: string;
  email: string;
  ativo: boolean | null;
  senha: string;
  confirmacaoSenha: string;
};

export type usuarioFiltrosListagem = {
  pesquisa?: string;
  perfilAcessoId?: number;
  perfilAcesso?: typeSelectOptions;
  ativo?: boolean | typeSelectOptions;
} & baseFiltros;

export type filtrosSelect = {
  pesquisa?: string;
};

export type alterarSenha = {
  senha: string;
  confirmacaoSenha: string;
};
