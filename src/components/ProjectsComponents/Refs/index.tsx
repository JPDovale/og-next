import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IRef } from '@api/responsesTypes/IProjcetResponse'
import { Avatares } from '@components/usefull/Avatares'
import { ProjectsContext } from '@contexts/projects'
import { Text } from '@components/usefull/Text'
import { CaretDown } from 'phosphor-react'
import { useContext, useState } from 'react'

import { Header, RefCard, RefsContainer } from './styles'

interface IRefsProps {
  title: string
  refs: IRef[]
  onSelectRef: (ref: IRef) => void
}

export function Refs({ title, refs, onSelectRef }: IRefsProps) {
  const [showRefs, setShowRefs] = useState(false)

  const { persons } = useContext(ProjectsContext)

  return (
    <RefsContainer>
      <Header as="label" family="body" refsVisible={showRefs}>
        <p>
          {title}
          <button type="button" onClick={() => setShowRefs(!showRefs)}>
            <CaretDown weight="bold" size={20} />
          </button>
        </p>
      </Header>

      {showRefs &&
        refs.map((ref) => {
          const filteredPersons = persons?.filter((person) => {
            const personInRef = !!ref.references.find(
              (reference) => reference === person.id,
            )

            return personInRef
          })

          return (
            <RefCard key={ref.object.id} onClick={() => onSelectRef(ref)}>
              <Header as="label" size="sm" family="body">
                <p>Titulo</p>
              </Header>
              <Text as="span" size="xs">
                {ref.object.title}
              </Text>

              <Header as="label" size="sm" family="body">
                <p>Descrição</p>
              </Header>
              <Text as="span" size="xs">
                {ref.object.description}
              </Text>

              <Header as="label" size="sm" family="body">
                <p>Personagem atribuídos a esse elemento</p>
              </Header>
              <Avatares
                listEmptyMessage="Nenhum personagem está atribuído a esse elemento diretamente"
                persons={filteredPersons as IPersonsResponse[]}
              />
            </RefCard>
          )
        })}
    </RefsContainer>
  )
}
