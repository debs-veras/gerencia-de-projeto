import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Modal from "../../components/Modal";
import Formulario from "../../components/Input";
import Box from "../Box";
import Botao from "../Button";
import {
  getUsuarioById,
  postUsuario,
  putUsuario,
} from "../../service/http-provider";
import useToastLoading from "../../hooks/useToastLoading";
import { usuario } from "../../types/usuario.d";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number;
  onRelonding: () => void;
};

export default function ModalCadastroUsuario(props: Props) {
  const { open, setOpen, id, onRelonding } = props;
  const navigate = useNavigate();
  const toast = useToastLoading();
  const [salvando, setSalvando] = useState<boolean>(false);
  const { handleSubmit, register, reset } = useForm<usuario>();
  const [dadosUsuario, setDadosUsuario] = useState<usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function cadastrarUsuario() {
    setSalvando(true);
    let dadosCadastro: usuario | undefined;

    await handleSubmit((dadosForm) => {
      dadosCadastro = { ...dadosForm, ativo: true };
    })();

    if (!dadosCadastro) return;

    const request = dadosUsuario?.id
      ? () => putUsuario(dadosCadastro as usuario)
      : () => postUsuario(dadosCadastro as usuario);

    const response = await request();

    if (response) {
      toast({ tipo: "success", mensagem: "Usuário cadastrado com sucesso!" });
      onRelonding();
      navigate(`/usuarios`);
    } else {
      toast({ tipo: "error", mensagem: response.mensagem });
    }

    setSalvando(false);
    setOpen(false);
  }

  async function carregarDadosUsuario() {
    if (!id) {
      reset();
      setLoading(false);
      return;
    }

    setLoading(true);
    const response = await getUsuarioById(Number(id));

    if (response) {
      setDadosUsuario(response);
      reset(response);
    } else {
      toast({ tipo: "error", mensagem: response.mensagem });
    }

    setLoading(false);
  }

  useEffect(() => {
    if (open) {
      carregarDadosUsuario();
    }
  }, [id, open]);

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
            <Box.Header.Content.Titulo>Usuário</Box.Header.Content.Titulo>
          </Box.Header.Content>
        </Box.Header>
        <Formulario className="h-full md:grid-cols-1">
          <Formulario.InputTexto
            name="nome"
            label="Nome"
            opcional={false}
            className="col-span-1"
            isFiltro
            register={register}
            lowercase={true}
          />

          <Formulario.InputTexto
            lowercase={true}
            name="email"
            label="Email"
            register={register}
            placeholder="Email"
            opcional={false}
          />

          <div className="grid md:grid-cols-2 col-span-1 gap-4">
            <Formulario.InputTexto
              lowercase={true}
              name="senha"
              label="Senha"
              type="password"
              register={register}
              placeholder="Senha"
              opcional={false}
            />
            <Formulario.InputTexto
              lowercase={true}
              name="confirmacaoSenha"
              label="Confirmar Senha"
              type="password"
              register={register}
              placeholder="Senha"
              opcional={false}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Botao
              texto="Cancelar"
              tipo="padrao"
              onClick={() => setOpen(false)}
            />

            <Botao
              carregando={salvando}
              onClick={() => cadastrarUsuario()}
              texto={!!id ? "Salvar alterações" : "Cadastrar Usuário"}
              tipo="sucesso"
            />
          </div>
        </Formulario>
      </Box>
    </Modal>
  );
}
