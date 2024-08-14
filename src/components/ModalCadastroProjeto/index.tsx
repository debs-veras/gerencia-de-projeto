import Modal from "../../components/Modal";
import Formulario from "../../components/Input";
import Box from "../Box";
import { useForm } from "react-hook-form";
import { typeSelectOptions } from "../../types/select.d";
import { useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import Botao from "../Button";
import { MdAdd } from "react-icons/md";
import ScrollArea from "../ScrollArea";
import ModalCadastroAtividade from "../ModalCadastroAtividade";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalCadastroProjeto(props: Props) {
  const { open, setOpen } = props;
  const methods = useForm();
  const [adicionarAtividadeOpen, setAdicionarAtividadeOpen] = useState<boolean>(false);
  const [opcoesSelectPrioridade] = useState<Array<typeSelectOptions>>([
    {
      value: 1,
      label: "Alta",
    },
    {
      value: 2,
      label: "Média",
    },
    {
      value: 3,
      label: "Baixa",
    },
  ]);
  const handleNovaAtividade = () => {
    setAdicionarAtividadeOpen(true);
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      tipo="sucesso"
      widthClassName="max-w-7xl w-6/12 h-[100vh] !p-0"
    >
      <Box className="w-full p-4 w rounded-tl-lg-md rounded-b-none">
        <Box.Header padding="pb-0" semLinha>
          <Box.Header.Content>
            <Box.Header.Content.Titulo>Projeto</Box.Header.Content.Titulo>
          </Box.Header.Content>
        </Box.Header>

        <Formulario className=" h-full md:grid-cols-1">
          <Formulario.InputTexto
            name="titulo"
            label="Título"
            opcional={false}
            className="col-span-1"
            isFiltro
            register={methods.register}
          />

          <Formulario.TextArea
            name="descricao"
            label="Descrição"
            opcional={false}
            register={methods.register}
            className="col-span-1"
          />

          <Formulario.InputSelect
            name={"prioridade"}
            label={"Prioridade"}
            control={methods.control}
            opcional={false}
            options={opcoesSelectPrioridade}
            className="col-span-1"
            isFiltro={true}
            labelOpcaoPadrao={"Todos"}
            placeholder={"Todos"}
          />

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
            <Botao
              texto="Nova Atividade"
              tipo="sucesso"
              icone={<MdAdd color="white" size={20} />}
              onClick={handleNovaAtividade}
            />
            
          </div>
          <ScrollArea className="h-64">
            <div className="w-full my-2 border border-gray-300 col-span-1 rounded-lg p-3 shadow-md bg-gray-100">
              <div className="flex items-center justify-between border-b-2">
                <span className="text-lg text-primary-800 font-semibold">
                  Gerência de Projeto
                </span>
                <span className="text-primary-700 font-semibold">
                  01-01-2001
                </span>
              </div>

              <div className="text-xs py-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                ut ad qui totam laboriosam fuga alias, beatae.
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold">40hrs | 08h - 12h</div>
                <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                  <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={"imagens/user.png"}
                    alt="Foto Usuário"
                  />
                </Avatar.Root>
              </div>
            </div>

            <div className="w-full my-2 border border-gray-300 col-span-1 rounded-lg p-3 shadow-md bg-gray-100">
              <div className="flex items-center justify-between border-b-2">
                <span className="text-lg text-primary-800 font-semibold">
                  Gerência de Projeto
                </span>
                <span className="text-primary-700 font-semibold">
                  01-01-2001
                </span>
              </div>

              <div className="text-xs py-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                ut ad qui totam laboriosam fuga alias, beatae.
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold">40hrs | 08h - 12h</div>
                <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                  <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={"imagens/user.png"}
                    alt="Foto Usuário"
                  />
                </Avatar.Root>
              </div>
            </div>

            <div className="w-full my-2 border border-gray-300 col-span-1 rounded-lg p-3 shadow-md bg-gray-100">
              <div className="flex items-center justify-between border-b-2">
                <span className="text-lg text-primary-800 font-semibold">
                  Gerência de Projeto
                </span>
                <span className="text-primary-700 font-semibold">
                  01-01-2001
                </span>
              </div>

              <div className="text-xs py-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                ut ad qui totam laboriosam fuga alias, beatae.
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold">40hrs | 08h - 12h</div>
                <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                  <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={"imagens/user.png"}
                    alt="Foto Usuário"
                  />
                </Avatar.Root>
              </div>
            </div>

            <div className="w-full my-2 border border-gray-300 col-span-1 rounded-lg p-3 shadow-md bg-gray-100">
              <div className="flex items-center justify-between border-b-2">
                <span className="text-lg text-primary-800 font-semibold">
                  Gerência de Projeto
                </span>
                <span className="text-primary-700 font-semibold">
                  01-01-2001
                </span>
              </div>

              <div className="text-xs py-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                ut ad qui totam laboriosam fuga alias, beatae.
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold">40hrs | 08h - 12h</div>
                <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                  <Avatar.Image
                    className="h-full w-full rounded-[inherit] object-cover"
                    src={"imagens/user.png"}
                    alt="Foto Usuário"
                  />
                </Avatar.Root>
              </div>
            </div>
          </ScrollArea>
          <Botao
            texto="Cancelar"
            tipo="padrao"
            onClick={() => setOpen(false)}
          />

          <Botao texto="Salvar" tipo="sucesso" />
        </Formulario>
      </Box>

      <ModalCadastroAtividade
        open={adicionarAtividadeOpen}
        setOpen={setAdicionarAtividadeOpen}
      />
    </Modal>
  );
}
