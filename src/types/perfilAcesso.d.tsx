import { baseEntity, baseFiltros } from "./baseEntity.d";
import { typeSelectOptions } from "./select.d";

export type perfilAcessoStatus = "ACESSO TOTAL" | "ACESSO PARCIAL" | "SEM ACESSO";

export type perfilAcessoCadastro = {
    id?: number;
    descricao?: string;
}

export type perfilAcessoListagem = {
    descricao: string;
    qtdUsuariosVinculados: number;
    usuariosPerfilAcesso: Array<string>;
} & baseEntity

export type perfilAcessoItemDetail = {
    idPerfilAcesso: number;
    idPerfilFuncionalidade: number;
    acessos: string;
    funcoes: any;
    nome: string;
    descricao: string;
    acesso: boolean;
}

export type perfilAcessoFiltrosListagem = {
    idPerfilAcesso?: number;
    pesquisa?: string;
    statusPerfilAcesso?: typeSelectOptions;
    ativo?: boolean;
    usuarioId?: number;
    usuario?: typeSelectOptions;
} & baseFiltros;

export type perfilAcessoFiltrosListagemForm = {
    pesquisa?: string;
    statusPerfilAcesso?: typeSelectOptions<perfilAcessoStatus>;
    ativo?: typeSelectOptions;
    usuario?: typeSelectOptions;
}