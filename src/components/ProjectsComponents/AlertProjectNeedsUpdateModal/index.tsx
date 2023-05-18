import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { ModalContent } from '@components/usefull/ModalContent'
import { Text } from '@components/usefull/Text'
import { useRouter } from 'next/router'
import {
  FlowArrow,
  Gear,
  HourglassSimpleLow,
  WarningOctagon,
} from 'phosphor-react'

interface IAlertProjectNeedsUpdateModal {
  projectId: string
}

export function AlertProjectNeedsUpdateModal({
  projectId,
}: IAlertProjectNeedsUpdateModal) {
  const router = useRouter()

  return (
    <ModalContent sizeWid="lg" hideCloseButton>
      <ContainerGrid padding={6}>
        <Text
          size="2xl"
          weight="bold"
          css={{
            display: 'flex',
            gap: '$4',
            alignItems: 'center',
          }}
        >
          INFORMAÇÕES TEMPORAIS
          <HourglassSimpleLow weight="fill" color="#481BA8" size={24} />
        </Text>
        <Text
          css={{ textAlign: 'justify' }}
          size="lg"
          height="shorter"
          family="body"
        >
          A mais recente funcionalidade introduzida no MagiScrita é a criação de
          linhas temporais, um recurso que permite aos autores definir datas e
          eventos dentro de suas histórias. Essa funcionalidade essencial dá aos
          escritores uma visão mais precisa e abrangente da estrutura temporal
          de sua narrativa, permitindo-lhes visualizar e organizar eventos
          importantes em uma sequência lógica.
          <br />
          <br />
          Ao criar uma linha do tempo no MagiScrita, os autores podem atribuir
          datas específicas a cada evento, desde ações cruciais que impulsionam
          a trama até pequenos momentos que adicionam profundidade aos
          personagens. Essa funcionalidade oferece aos escritores um nível sem
          precedentes de controle sobre sua história, ajudando-os a evitar
          inconsistências ou contradições temporais.
          <br />
          <br />
          Imagine ter a capacidade de navegar facilmente pela linha do tempo de
          sua história, visualizando cada evento e sua posição relativa em
          relação a outros eventos-chave. Com a funcionalidade de linha do tempo
          do MagiScrita, os autores podem identificar possíveis falhas na
          sequência de eventos, corrigi-las e aprimorar a coerência narrativa.
          <br />
          <br />
          Além disso, a criação de linhas temporais no MagiScrita também
          facilita o gerenciamento de subtramas e personagens secundários. Com
          uma visão clara das datas e eventos que ocorrem em paralelo, os
          autores podem garantir que cada personagem esteja no lugar certo, na
          hora certa, criando conexões significativas e tramas entrelaçadas.
          <br />
          <br />
          Por essa razões você precisa fazer alguns ajustes nas configurações do
          seu projeto, para poder continuar...
          <br />
          <br />
          Nossa plataforma visa a facilidade na hora de criar sua história, por
          isso, logo ao definir uma data de inicio do seu projeto, criaremos uma
          linha de tempo para esse de forma automática, porem, antes de você
          definir alguma data, precisamos te conscientizar de alguns pontos.
        </Text>

        <Text
          size="2xl"
          weight="bold"
          css={{
            display: 'flex',
            gap: '$4',
            alignItems: 'center',
          }}
        >
          LEIA ANTES DE PROSSEGUIR
          <WarningOctagon weight="fill" color="#481BA8" size={24} />
        </Text>

        <Text
          css={{ textAlign: 'justify' }}
          size="lg"
          height="shorter"
          family="body"
        >
          A partir daqui você precisa-rá definir uma data de inicio para o seu
          projeto e essa data deve levar em consideração alguns pontos
          importantes.
          <br />
          <br />
          Essa data está associada ao momento em que a história acontece... Por
          exemplo: Se você está escrevendo uma ficção cientifica que se passa no
          ano de 3060, a data que você deve colocar nas configurações do projeto
          é o ano de 3060.
          <br />
          <br />
          Caso você esteja escrevendo um romance de época que se passa em 1943,
          então a data de inicio do seu projeto deve ser definida como 1943.
          <br />
          <br />
          E se a minha história se passar no presente? Sem problemas... basta
          definir o ano para 2023.
          <br />
          <br />
          Se você não tem uma data de inicio para a história, ou caso isso não
          seja relevante para o seu projeto, basta desabilitar o uso das{' '}
          <strong>time-lines</strong> nas configurações
          <br />
          <br />
          Vale ressaltar que essa data de inicio não se refere a criação do
          projeto, mas sim ao inicio do período em que a história começa se
          passar. Essa data não deve ser exata, por isso o campo deve ser
          preenchido apenas com o ano em que a história se passa.
          <br />
          <br />
          Com essa nova definição de data,
          <strong style={{ fontSize: 20, textTransform: 'uppercase' }}>
            {' '}
            o campo de &quot;Tempo em que se passa&quot; na aba &quot;Plot&quot;
            irá sumir na proxima atualização.{' '}
          </strong>
          Então se você tem algum texto importante lá, salve-o
        </Text>

        <Text
          size="2xl"
          weight="bold"
          css={{
            display: 'flex',
            gap: '$4',
            alignItems: 'center',
          }}
        >
          POR QUE ISSO É IMPORTANTE?
          <FlowArrow weight="fill" color="#481BA8" size={24} />
        </Text>

        <Text
          css={{ textAlign: 'justify' }}
          size="lg"
          height="shorter"
          family="body"
        >
          Essa data será usada para definir em que momento da história seus
          personagens nasceram, ou os as cenas definidas nos livros
          aconteceram... Não se preocupe, você poderá alterar isso depois, caso
          o resultado não seja o esperado
          <br />
          <br />
          Alguns exemplos... Se você possui um personagem com uma idade definida
          em 10 anos e a data de inicio do seu projeto está definida para 2030,
          certamente o seu personagem nasceu em 2020.
          <br />
          <br />
          Essa definição será feita de forma automática na linha de tempo do
          projeto. Se você precisar pode deixar com mais precisão a data de
          nascimento dos seus personagens editando-os, podendo definir desde o
          dia até mesmo as horas, minutos e segundos. Se você escreve mistérios
          com muitos detalhe, vale explorar muito essa nova funcionalidade
          <br />
          <br />
          As cenas dos livros não serão ajustadas automaticamente, por isso você
          precisa-rá defini-las casso seja importante para a sua história.
          <br />
          <br />
          Agora que você sabe exatamente o que precisa fazer, vamos as
          configurações...
        </Text>

        <ButtonRoot
          onClick={() => router.push(`/project/${projectId}/settings`)}
          align="center"
        >
          <ButtonIcon>
            <Gear />
          </ButtonIcon>

          <ButtonLabel>IR PARA AS CONFIGURAÇÕES DO PROJETO</ButtonLabel>
        </ButtonRoot>
      </ContainerGrid>
    </ModalContent>
  )
}
