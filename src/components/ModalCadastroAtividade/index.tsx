import Modal from "../../components/Modal";
import Formulario from "../../components/Input";
import Box from "../Box";
import { useForm } from "react-hook-form";
import Botao from "../Button";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalCadastroAtividade(props: Props) {
  const { open, setOpen } = props;
  const methods = useForm();

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
            register={methods.register}
          />

          <div className="grid md:grid-cols-2 col-span-1 gap-4">
            <Formulario.InputData
              name="data"
              label="Data"
              opcional={false}
              className="col-span-1"
              isFiltro
              control={methods.control}
            />
            <div className="grid md:grid-cols-2 w-full gap-4">
              <Formulario.InputHorario
                name="hr-inicio"
                label="Horário Inicio"
                opcional={false}
                className="col-span-1"
                isFiltro
                control={methods.control}
              />
              <Formulario.InputHorario
                name="hr-fim"
                label="Horario Fim"
                opcional={false}
                className="col-span-1"
                isFiltro
                control={methods.control}
              />
            </div>
          </div>

          <Formulario.TextArea
            name="descricao"
            label="Descrição"
            opcional={false}
            register={methods.register}
            className="col-span-1"
          />

          <Botao
            texto="Cancelar"
            tipo="padrao"
            onClick={() => setOpen(false)}
          />

          <Botao texto="Salvar" tipo="sucesso" />
        </Formulario>
      </Box>
    </Modal>
  );
}
