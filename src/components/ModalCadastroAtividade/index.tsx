import Modal from "../../components/Modal";
import Formulario from "../../components/Input";
import Box from "../Box";
import { Control, useForm } from "react-hook-form";
import Botao from "../Button";
import { atividade } from "../../types/atividade.d";
import { useEffect, useState } from "react";
import { projeto } from "../../types/projeto.d";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  adicionaAtividade: (atividade: atividade) => void;
  atividadeSelecionada: atividade | null;
  setAtividadeSelecionada: React.Dispatch<
    React.SetStateAction<atividade | null>
  > | null;
  control: Control<projeto>,
};

export default function ModalCadastroAtividade(props: Props) {
  const {
    open,
    setOpen,
    adicionaAtividade,
    atividadeSelecionada,
    setAtividadeSelecionada,
    control
  } = props;
  const [id, setId] = useState(atividadeSelecionada?.id || 0);

  const [salvandoCadastro, setSalvandoCadastro] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<atividade>();

  const limparDados = () => {
    setAtividadeSelecionada && setAtividadeSelecionada(null);
    setId(0);
  };

  useEffect(() => {
    if (atividadeSelecionada) reset({ ...atividadeSelecionada });

    if (!open) limparDados();
  }, [atividadeSelecionada]);

  async function handleSalvarAtividade(): Promise<void> {
    setSalvandoCadastro(true);
    let dadosAtividade: atividade = {} as any;

    await handleSubmit((dadosForm) => {
      dadosAtividade = { ...dadosForm };
    })();

    setOpen(false);
    setSalvandoCadastro(false);
    adicionaAtividade(dadosAtividade);
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      tipo="sucesso"
      widthClassName="max-w-7xl w-6/12 h-[85vh] !p-0"
    >
      <Box className="w-full p-4 w rounded-tl-lg-md rounded-b-none">
        <Box.Header padding="pb-0" semLinha>
          <Box.Header.Content>
            <Box.Header.Content.Titulo>Atividade</Box.Header.Content.Titulo>
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
            disabled={salvandoCadastro}
          />

          <div className="grid md:grid-cols-2 col-span-1 gap-4">
            <Formulario.InputData
              name="data"
              label="Data"
              opcional={false}
              className="col-span-1"
              isFiltro
              control={control}
            />
            <div className="grid md:grid-cols-2 w-full gap-4">
              <Formulario.InputHorario
                name="hr-inicio"
                label="Horário Inicio"
                opcional={false}
                className="col-span-1"
                isFiltro
                register={register}
              />
              <Formulario.InputHorario
                name="hr-fim"
                label="Horario Fim"
                opcional={false}
                className="col-span-1"
                isFiltro
                register={register}
              />
            </div>
          </div>

          <Formulario.TextArea
            name="descricao"
            label="Descrição"
            opcional={false}
            register={register}
            className="col-span-1"
            disabled={salvandoCadastro}
          />

          <Botao
            texto="Cancelar"
            tipo="padrao"
            onClick={() => setOpen(false)}
          />

          <Botao
            texto="Salvar"
            tipo="sucesso"
            onClick={() => handleSalvarAtividade()}
          />
        </Formulario>
      </Box>
    </Modal>
  );
}
