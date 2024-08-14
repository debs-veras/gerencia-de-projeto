import { projeto } from "../types/projeto.d";

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
