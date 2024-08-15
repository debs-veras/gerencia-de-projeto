import { projeto } from "../types/projeto.d";
import { usuario } from "../types/usuario.d";

import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const getProjetoById = async (id: number) => {
  return await getRequest(`projetos/${id}`);
}

export const getListProjetos = async () => {
  return await getRequest("projetos");
}

export const putProjeto = async (date: projeto) => {
  return await putRequest(`projetos/${date.id}/`, date);
}

export const postProjeto = async (date: projeto) => {
  return await postRequest(`projetos/`, date);
}

export const deleteProjeto = async (id: number) => {
  return await deleteRequest(`projetos/${id}`);
}

export const getUsuarioById = async (id: number) => {
  return await getRequest(`usuarios/${id}`);
}

export const getListUsuarios = async () => {
  return await getRequest("usuarios");
}

export const putUsuario = async (date: usuario) => {
  return await putRequest(`usuarios/${date.id}/`, date);
}

export const postUsuario = async (date: usuario) => {
  return await postRequest(`usuarios/`, date);
}

export const deleteUsuario = async (id: number) => {
  return await deleteRequest(`usuarios/${id}`);
}
