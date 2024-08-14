import { useState } from "react";
import Box, { BoxContainer } from "../../components/Box";
import Formulario from "../../components/Input";
import { useForm } from "react-hook-form";
import { typeSelectOptions } from "../../types/select.d";

export default function Inicio() {
  const methods = useForm();
  const [opcoesSelectPrioridade] = useState<Array<typeSelectOptions>>(
    [
      {
        value: 1,
        label: 'Alta'
      },
      {
        value: 2,
        label: 'Média'
      },
      {
        value: 3,
        label: 'Baixa'
      }
    ]
  );

  const [opcoesParticipantes] = useState<Array<typeSelectOptions>>(
    [
      {
        value: 1,
        label: 'Débora'
      },
      {
        value: 2,
        label: 'João'
      },
      {
        value: 3,
        label: 'Box3'
      }
    ]
  );

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
            className='col-span-1'
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
            className='col-span-1'
            isFiltro={true}
            labelOpcaoPadrao={"Todos"}
            placeholder={"Todos"}
          />
        </Formulario>
      </Box>
    </BoxContainer>
  );
}
