import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import useToastLoading from "../../hooks/useToastLoading";

import Botao from "../../components/Button";
import EmptyPage from "../../components/EmptyPage";
import Formulario from "../../components/Input";
import useDebounce from "../../hooks/useDebounce";
import Box, { BoxContainer } from "../../components/Box";
import Page from "../../components/Page";
import Tabela from "../../components/Tabela";

import { usuarioFiltrosListagem, usuario } from "../../types/usuario.d";
import { deleteUsuario, getListUsuarios } from "../../service/http-provider";
import TagAtivo from "../../components/AtivoTag";
import ModalCadastroUsuario from "../../components/ModalCadastroUsuario";
import MenuDropdown from "../../components/MenuDropdown";
import Modal from "../../components/Modal";

export default function UsuarioListagem() {
  const toast = useToastLoading();
  const [adicionarUsuarioOpen, setAdicionarUsuarioOpen] = useState<boolean>(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<usuario | null>(null);
  const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  const [listaUsuario, setListaUsuario] = useState<Array<usuario>>([]);

  const { register } = useForm<usuarioFiltrosListagem>();

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

  const handleEditarUsuario = (dados:usuario) => {
    setUsuarioSelecionado(dados);
    setAdicionarUsuarioOpen(true);
  };

  useEffect(() => {
    filtroDebounce();
  }, []);

  useEffect(() => {
    if(usuarioSelecionado) setId(usuarioSelecionado.id)
  }, [usuarioSelecionado])

  const carregaUsuarios = async (): Promise<void> => {
    setLoadingListagem(true);
    const response = await getListUsuarios();

    if (response) setListaUsuario(response);
    else toast({ tipo: response.tipo, mensagem: response.mensagem });

    setLoadingListagem(false);
    setLoading(false);
  };

  function handleDeleteUsuario(dados: usuario) {
    setUsuarioSelecionado(dados);
    setConfirmacaoDeletar(true);
  }

  async function confirmDeleteUsuario(): Promise<void> {
    if (usuarioSelecionado == null) {
      toast({
        tipo: "error",
        mensagem: "Erro ao deletar: nenhum item selecionado!",
      });
      return;
    }

    await deleteUsuario(usuarioSelecionado.id);
    carregaUsuarios();

    toast({ tipo: "success", mensagem: "Usuário deletado com sucesso." });
  }

  const filtroDebounce = useDebounce(carregaUsuarios, 500);

  return (
    <Page loading={loading}>
      <BoxContainer>
        <Box>
          <Box.Header>
            <Box.Header.Content>
              <Box.Header.Content.Titulo>Filtros</Box.Header.Content.Titulo>
            </Box.Header.Content>
          </Box.Header>
          <Formulario className="lg:grid-cols-4">
            <Formulario.InputTexto
              name="pesquisa"
              label="Pesquisa"
              subTitulo="(Id, Nome)"
              opcional={true}
              register={register}
              className="lg:col-span-2"
              isFiltro
            />
          </Formulario>
        </Box>

        {!listaUsuario.length ? (
          <Box>
            <EmptyPage texto="Nenhum Usuário Cadastrado" botao={true} />
          </Box>
        ) : (
          <Box>
            <>
              <Tabela
                titulo="Usuários"
                botoes={
                  <Botao
                    texto="Adicionar"
                    tipo="sucesso"
                    onClick={() => {
                      setAdicionarUsuarioOpen(true);
                    }}
                  />
                }
              >
                <Tabela.Header>
                  <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                  <Tabela.Header.Coluna>Nome</Tabela.Header.Coluna>
                  <Tabela.Header.Coluna>E-mail</Tabela.Header.Coluna>
                  <Tabela.Header.Coluna alignText="text-center">
                    Status
                  </Tabela.Header.Coluna>
                  <Tabela.Header.Coluna alignText="text-center">
                    Ações
                  </Tabela.Header.Coluna>
                </Tabela.Header>

                <Tabela.Body>
                  {listaUsuario.map((item) => {
                    return (
                      <Tabela.Body.Linha key={item.id}>
                        <Tabela.Body.Linha.Coluna>
                          {item.id}
                        </Tabela.Body.Linha.Coluna>

                        <Tabela.Body.Linha.Coluna>
                          {item.nome}
                        </Tabela.Body.Linha.Coluna>
                        <Tabela.Body.Linha.Coluna>
                          {item.email}
                        </Tabela.Body.Linha.Coluna>
                        <Tabela.Body.Linha.Coluna alignText="text-center">
                          <TagAtivo ativo={item.ativo || false} />
                        </Tabela.Body.Linha.Coluna>
                        <Tabela.Body.Linha.Coluna alignText="text-center">
                          <MenuDropdown>
                            <MenuDropdown.Opcao
                            tipo="editar"
                            ativo={true}
                            acaoBotao={() => handleEditarUsuario(item)}
                          />
                            <MenuDropdown.Opcao
                              tipo="excluir"
                              ativo={true}
                              acaoBotao={() => handleDeleteUsuario(item)}
                            />
                          </MenuDropdown>
                        </Tabela.Body.Linha.Coluna>
                      </Tabela.Body.Linha>
                    );
                  })}
                </Tabela.Body>
              </Tabela>
            </>
          </Box>
        )}
      </BoxContainer>

      <ModalCadastroUsuario
        id={id}
        open={adicionarUsuarioOpen}
        setOpen={setAdicionarUsuarioOpen}
        onRelonding={carregaUsuarios}
      />

      <Modal open={confirmacaoDeletar} setOpen={setConfirmacaoDeletar}>
        <Modal.Titulo texto={`Deletar ${usuarioSelecionado?.nome}`} />
        <Modal.Descricao
          texto={`Deseja realmente deletar o Usuário ${usuarioSelecionado?.nome}?`}
        />

        <Modal.ContainerBotoes>
          <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteUsuario} />
          <Modal.BotaoCancelar />
        </Modal.ContainerBotoes>
      </Modal>
    </Page>
  );
}
