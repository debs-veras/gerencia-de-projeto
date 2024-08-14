import { useEffect, useState } from "react";
import Box, { BoxContainer } from "../../components/Box";
import Formulario from "../../components/Input";
import { useForm } from "react-hook-form";
import { typeSelectOptions } from "../../types/select.d";
import Botao from "../../components/Button";
import Card from "../../components/Card";
import ModalCadastroProjeto from "../../components/ModalCadastroProjeto";
import { MdAdd } from "react-icons/md";
import { getListProjetos } from "../../service/http-provider";
import useDebounce from "../../hooks/useDebounce";
import { projeto } from "../../types/projeto.d";

export default function Inicio() {
  const methods = useForm();
  const [adicionarProjetoOpen, setAdicionarProjetoOpen] = useState<boolean>(false);
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
  const [opcoesParticipantes] = useState<Array<typeSelectOptions>>([
    {
      value: 1,
      label: "Débora",
    },
    {
      value: 2,
      label: "João",
    },
    {
      value: 3,
      label: "Box3",
    },
  ]);
  const [listaProjetos, setListaProjetos] = useState<Array<projeto>>([]);
  // const { watch, handleSubmit, register, control } = useForm<cursoFiltrosListagem>();

  const handleNovoProjeto = () => {
    setAdicionarProjetoOpen(true);
  };

  const carregaProjetos = async (): Promise<void> => {
    const request = () => getListProjetos();
    const response = await request();
    setListaProjetos(response);
  };

  const filtroDebounce = useDebounce(carregaProjetos, 500);

  useEffect(() => {
    filtroDebounce();
  }, []);

  return (
    <BoxContainer>
      <Box>
        <Box.Header>
          <Box.Header.Content>
            <Box.Header.Content.Titulo>Filtros</Box.Header.Content.Titulo>
          </Box.Header.Content>
        </Box.Header>

        <Formulario className="md:grid-cols-4">
          <Formulario.InputTexto
            name="pesquisa"
            label="Pesquisa"
            placeholder="Pesquisar..."
            opcional={true}
            subTitulo="(Titulo e Descrição)"
            className="col-span-1"
            isFiltro
            register={methods.register}
          />

          <Formulario.InputPeriodo
            name="periodo"
            label="Período"
            opcional={true}
            control={methods.control}
            className="col-span-1"
          />

          <Formulario.InputSelectMulti
            name={"participantes"}
            label={"Participantes"}
            control={methods.control}
            opcional={true}
            options={opcoesParticipantes}
            className="col-span-1"
            isFiltro={true}
            labelOpcaoPadrao={"Todos"}
            placeholder={"Todos"}
          />

          <Formulario.InputSelect
            name={"prioridade"}
            label={"Prioridade"}
            control={methods.control}
            opcional={true}
            options={opcoesSelectPrioridade}
            className="col-span-1"
            isFiltro={true}
            labelOpcaoPadrao={"Todos"}
            placeholder={"Todos"}
          />
        </Formulario>
      </Box>

      <Box>
        <div className="border-b">
          <div className="sm:flex pb-4 sm:items-center border-gray-200">
            <div className="sm:flex-auto">
              <div className="flex flex-row items-center gap-2">
                <h1 className="font-semibold text-primary-900 text-lg">
                  Projetos
                </h1>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-2 lg:mt-0">
              <Botao
                texto="Adicionar"
                tipo="sucesso"
                icone={
                  <MdAdd color="white" size={20} onClick={handleNovoProjeto} />
                }
              />
            </div>
          </div>
        </div>
        <div className="md:grid-cols-4 grid grid-cols-1 gap-4 items-start">
          {listaProjetos.length > 0 && listaProjetos.map((item: projeto) => {
            return <Card key={item.id} projeto={item} onRelonding={ carregaProjetos }/>;
          })}
        </div>
      </Box>

      <ModalCadastroProjeto
        open={adicionarProjetoOpen}
        setOpen={setAdicionarProjetoOpen}
      />
    </BoxContainer>
  );
}
