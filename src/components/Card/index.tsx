import * as Avatar from "@radix-ui/react-avatar";
import Tag from "../Tag";
import MenuDropdown from "../../components/MenuDropdown";
import { projeto } from "../../types/projeto.d";
import { formatarData } from "../../utils/data";
import Modal from "../../components/Modal";
import useToastLoading from "../../hooks/useToastLoading";
import { deleteProjeto } from "../../service/http-provider";
import { useState } from "react";
import ModalCadastroProjeto from "../ModalCadastroProjeto";

type Props = {
  projeto: projeto;
  onRelonding: () => void;
};

export default function Card(props: Props) {
  const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
  const [editarProjetoOpen, setEditarProjetoOpen] = useState<boolean>(false);
  const toast = useToastLoading();

  function receberTag(prioridade: string) {
    if (prioridade === "Alta") return "error";
    else if (prioridade === "Média") return "alert";
    else if (prioridade === "Baixa") return "info";
  }

  async function confirmDeleteProjeto() {
    toast({ mensagem: "Deletando Curso" });

    const response = await deleteProjeto(props.projeto.id);

    if (response) {
      toast({
        mensagem: "Projeto deletado com sucesso.",
        tipo: response.tipo,
      });
      props.onRelonding();
    } else {
      toast({
        mensagem: response.mensagem,
        tipo: response.tipo,
      });
    }
  }

  const handleEditarProjeto = () => {
    setEditarProjetoOpen(true);
  };

  return (
    <>
      <div className="w-full border border-gray-300 col-span-1 rounded-lg p-3 shadow-md bg-gray-100">
        <div className="flex items-center justify-between border-b-2">
          <span className="text-lg text-primary-800 font-semibold">
            {props.projeto.titulo}
          </span>
          <span className="text-primary-700 font-semibold">
            <MenuDropdown>
              <MenuDropdown.Opcao
                tipo="editar"
                ativo={true}
                acaoBotao={() => handleEditarProjeto()}
              />
              <MenuDropdown.Opcao
                tipo="excluir"
                ativo={true}
                acaoBotao={() => setConfirmacaoDeletar(true)}
              />
            </MenuDropdown>
          </span>
        </div>

        <div className="text-xs py-2">{props.projeto.descricao}</div>

        <div className="flex items-center justify-between text-xs my-1">
          <div className="font-semibold">
            40hrs | Total de atividades: {props.projeto.atividades?.length || 0}
          </div>
          <span className="text-primary-700 font-semibold">
            {formatarData(props.projeto.dataCadastro || "", "data")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <div className="flex -space-x-3 overflow-hidden">
              <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={"imagens/user.png"}
                  alt="Foto Usuário"
                />
              </Avatar.Root>
              <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={"imagens/user.png"}
                  alt="Foto Usuário"
                />
              </Avatar.Root>
              <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={"imagens/user.png"}
                  alt="Foto Usuário"
                />
              </Avatar.Root>
              <div className="h-7 w-7 rounded-full bg-gray-200 text-xs text-gray-700 flex items-center justify-center border-2 border-white">
                +3
              </div>
            </div>
          </div>
          <Tag
            status={receberTag(props.projeto.prioridade.label)}
            className="px-4 py-1"
          >
            {props.projeto.prioridade.label}
          </Tag>
        </div>
      </div>

      <Modal open={confirmacaoDeletar} setOpen={setConfirmacaoDeletar}>
        <Modal.Titulo texto={`Deletar ${props.projeto.titulo}`} />
        <Modal.Descricao texto={`Deseja realmente deletar esse projeto?`} />

        <Modal.ContainerBotoes>
          <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteProjeto} />
          <Modal.BotaoCancelar />
        </Modal.ContainerBotoes>
      </Modal>

      <ModalCadastroProjeto
        id={props.projeto.id}
        open={editarProjetoOpen}
        setOpen={setEditarProjetoOpen}
        onRelonding={props.onRelonding}
      />
    </>
  );
}
