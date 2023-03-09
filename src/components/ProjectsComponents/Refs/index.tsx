import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { Avatares } from '@components/usefull/Avatares'
import { ProjectsContext } from '@contexts/projects'
import { Text } from '@components/usefull/Text'
import { CaretDown } from 'phosphor-react'
import { useContext, useState } from 'react'

import { Header, RefCard, RefsContainer } from './styles'
import { IArchive } from '@api/responsesTypes/IBoxResponse'

interface IRefsProps {
  title: string
  referenceArchives: IArchive[]
  onSelectRef: (ref: IArchive) => void
}

export function Refs({ title, referenceArchives, onSelectRef }: IRefsProps) {
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
        referenceArchives.map((file) => {
          const filteredPersons = persons?.filter((person) => {
            const personInRef = !!file?.links?.find(
              (link) => link.id === person.id,
            )

            return personInRef
          })

          return (
            <RefCard key={file.archive.id} onClick={() => onSelectRef(file)}>
              <Header as="label" size="sm" family="body">
                <p>Titulo</p>
              </Header>
              <Text as="span" size="xs">
                {file.archive.title}
              </Text>

              <Header as="label" size="sm" family="body">
                <p>Descrição</p>
              </Header>
              <Text as="span" size="xs">
                {file.archive.description}
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
