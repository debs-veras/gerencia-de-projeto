import Modal from "../../components/Modal";
import Formulario from "../../components/Input";
import Box from "../Box";
import { useFieldArray, useForm } from "react-hook-form";
import { typeSelectOptions } from "../../types/select.d";
import { useEffect, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import Botao from "../Button";
import { MdAdd } from "react-icons/md";
import ScrollArea from "../ScrollArea";
import ModalCadastroAtividade from "../ModalCadastroAtividade";
import { projeto } from "../../types/projeto.d";
import {
  getProjetoById,
  postProjeto,
  putProjeto,
} from "../../service/http-provider";
import useToastLoading from "../../hooks/useToastLoading";
import { useNavigate } from "react-router-dom";
import { atividade } from "../../types/atividade.d";
import { formatarData } from "../../utils/data";
import MenuDropdown from "../MenuDropdown";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number;
  onRelonding: () => void;
};

export default function ModalCadastroProjeto(props: Props) {
  const navigate = useNavigate();
  const { open, setOpen, id } = props;
  const toast = useToastLoading();
  const [loading, setLoading] = useState<boolean>(true);

  const { handleSubmit, register, control, reset, getValues, setValue } =
    useForm<projeto>();
  const [salvando, setSalvando] = useState<boolean>(false);
  const [adicionarAtividadeOpen, setAdicionarAtividadeOpen] =
    useState<boolean>(false);
  const [dadosProjeto, setDadosProjeto] = useState<projeto>();
  const [atividadeSelecionada, setAtividadeSelecionada] =
    useState<atividade | null>(null);

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

  const { fields, move, remove, append, update } = useFieldArray({
    control,
    name: "atividades",
  });

  const handleNovaAtividade = () => {
    setAdicionarAtividadeOpen(true);
  };

  const handleAdicionaAtividade = (data: atividade) => {
    if (atividadeSelecionada == null) {
      append(data);
      return;
    }

    const indexUpdate = fields.findIndex(
      (x) => x.id == atividadeSelecionada.id
    );
    update(indexUpdate, data);
  };


  useEffect(() => {
    if (!!id) carregarDadosProjeto();
    else setLoading(false);
  }, []);

  async function carregarDadosProjeto() {
    setLoading(true);
    const response = await getProjetoById(Number(id));

    if (response) {
      setDadosProjeto(response);
      reset({ ...response });
    } else toast({ tipo: response.tipo, mensagem: response.mensagem });

    setLoading(false);
  }

  async function cadastrarProjeto() {
    setSalvando(true);
    let dadosCadastro: projeto;

    await handleSubmit((dadosForm) => {
      dadosCadastro = {
        ...dadosForm,
        dataCadastro: new Date(),
        atividades: dadosForm.atividades?.map<atividade>((dados) => {
          return {
            ...dados,
            dataCadastro: new Date(),
          };
        }),
      };
    })();

    const request = () =>
      dadosProjeto?.id ? putProjeto(dadosCadastro) : postProjeto(dadosCadastro);

    const response = await request();

    if (response) {
      toast({ tipo: "success", mensagem: "Projeto cadastrado com sucesso!" });
      props.onRelonding();
      navigate(`/`);
    } else toast({ tipo: response.tipo, mensagem: response.mensagem });

    setSalvando(false);
    setOpen(false);
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
            register={register}
            lowercase
          />

          <Formulario.TextArea
            name="descricao"
            label="Descrição"
            opcional={false}
            register={register}
            className="col-span-1"
          />

          <Formulario.InputSelect
            name={"prioridade"}
            label={"Prioridade"}
            control={control}
            opcional={false}
            options={opcoesSelectPrioridade}
            className="col-span-1"
            isFiltro={false}
            labelOpcaoPadrao={"Selecione"}
            placeholder={"Selecione"}
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

          <ScrollArea className="h-60">
            {fields.map((field) => {
              return (
                <>
                  <div className="w-full my-2 border border-gray-300 col-span-1 rounded-lg p-3 shadow-md bg-gray-100">
                    <div className="flex items-center justify-between border-b-2">
                      <span className="text-lg text-primary-800 font-semibold">
                        {field.titulo}
                      </span>
                      <span className="text-primary-700 font-semibold">
                        {formatarData(field.dataCadastro || "", "data")}
                      </span>
                    </div>

                    <div className="text-xs py-2">{field.descricao}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold">
                        {field.totalHoras} Hrs | {field.horarioInicio}-{field.horarioFim}
                      </div>
                      <Avatar.Root className="mt-2 bg-gray-100 inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                        <Avatar.Image
                          className="h-full w-full rounded-[inherit] object-cover"
                          src={"imagens/user.png"}
                          alt="Foto Usuário"
                        />
                      </Avatar.Root>
                    </div>
                  </div>
                </>
              );
            })}
          </ScrollArea>

          <Botao
            carregando={salvando}
            texto="Cancelar"
            tipo="padrao"
            onClick={() => setOpen(false)}
          />

          <Botao
            carregando={salvando}
            onClick={() => cadastrarProjeto()}
            texto={!!id ? "Salvar alterações" : "Cadastrar Projeto"}
            tipo="sucesso"
          />
        </Formulario>
      </Box>

      <ModalCadastroAtividade
        control={control}
        open={adicionarAtividadeOpen}
        setOpen={setAdicionarAtividadeOpen}
        adicionaAtividade={handleAdicionaAtividade}
        atividadeSelecionada={atividadeSelecionada}
        setAtividadeSelecionada={setAtividadeSelecionada}
      />
    </Modal>
  );
}
