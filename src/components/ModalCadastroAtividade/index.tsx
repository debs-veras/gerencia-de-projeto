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

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalCadastroAtividade(props: Props) {
  const { open, setOpen } = props;
  const methods = useForm();
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
            <Box.Header.Content.Titulo>Projeto</Box.Header.Content.Titulo>
          </Box.Header.Content>
        </Box.Header>

      </Box>
    </Modal>
  );
}
