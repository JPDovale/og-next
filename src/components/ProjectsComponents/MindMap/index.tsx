// import { Text } from '@components/usefull/Text'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { Avatares } from '@components/usefull/Avatares'
import { useProject } from '@hooks/useProject'
import { Text } from '@components/usefull/Text'
import { useRouter } from 'next/router'
import { ArrowCircleUp } from 'phosphor-react'
import { useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { CardProject } from '../CardProject'

import {
  ButtonColapse,
  MindMapContainer,
  MindMapContent,
  Persons,
  PersonsContent,
  PersonsHeader,
  ProjectContent,
  Reference,
  References,
  Tag,
  TagsOfProject,
} from './styles'

export function MindMap() {
  const [tagsIsColapse, setTagsIsColapse] = useState(false)
  const [personsIsColapse, setPersonsIsColapse] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const { project, personsThisProject, tags } = useProject(id as string)

  return (
    <MindMapContainer>
      <TransformWrapper
        maxScale={2}
        minScale={0.05}
        initialScale={0.4}
        initialPositionX={50}
        initialPositionY={50}
        centerZoomedOut={false}
        alignmentAnimation={{ disabled: true, sizeY: 10000, sizeX: 10000 }}
      >
        <TransformComponent
          wrapperStyle={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <MindMapContent>
            <ProjectContent>
              <CardProject project={project} />
            </ProjectContent>
            <PersonsContent>
              <Persons>
                <PersonsHeader>
                  <Text>Personagens: {personsThisProject.length}</Text>

                  <ButtonColapse
                    isColapse={personsIsColapse}
                    name="Fechar personagens"
                    onClick={() => setPersonsIsColapse(!personsIsColapse)}
                  >
                    <ArrowCircleUp size={24} />
                  </ButtonColapse>
                </PersonsHeader>

                <Avatares
                  size="lg"
                  columns={12}
                  persons={!personsIsColapse ? personsThisProject : []}
                  listEmptyMessage={
                    !personsIsColapse
                      ? 'Nenhum personagem foi criado ainda'
                      : ''
                  }
                  isClickable
                />
              </Persons>

              <TagsOfProject>
                <header>
                  <Text>
                    Tags:{' '}
                    {personsThisProject[0] ? tags.length - 1 : tags.length}
                  </Text>

                  <ButtonColapse
                    isColapse={tagsIsColapse}
                    name="Fechar tags"
                    onClick={() => setTagsIsColapse(!tagsIsColapse)}
                  >
                    <ArrowCircleUp size={24} />
                  </ButtonColapse>
                </header>

                {!tagsIsColapse && (
                  <>
                    {tags.length === 0 ||
                      (tags.length === 1 && personsThisProject[0] && (
                        <Text family="body" css={{ alignSelf: 'center' }}>
                          Nenhuma tag foi criada ainda. Não se preocupe... as
                          tags são criada automaticamente, visando a criação de
                          conexões automáticas entro os vários elementos do seu
                          projeto.
                        </Text>
                      ))}

                    {tags.map((tag) => {
                      if (tag.type === 'persons') return ''
                      if (tag.type === 'books') return ''

                      return (
                        <Tag key={tag.id}>
                          <div>
                            <Text size="xl">
                              {tag.type}: {tag.refs.length}
                              <Text as="span" family="body">
                                {tag.origPath}
                              </Text>
                            </Text>
                          </div>
                          <References>
                            {tag.refs.map((ref) => {
                              const personsInThisRef = ref.references.map(
                                (r) => {
                                  const personFind = personsThisProject.find(
                                    (person) => person?.id === r,
                                  )
                                  return personFind
                                },
                              ) as IPersonsResponse[]

                              return (
                                <Reference key={ref.object?.id}>
                                  <div>
                                    <Text>{ref.object?.title}</Text>

                                    <Text
                                      as="span"
                                      family="body"
                                      height="short"
                                    >
                                      {ref.object?.description}
                                    </Text>
                                  </div>

                                  <Persons inRef>
                                    <Avatares
                                      columns={5}
                                      persons={personsInThisRef}
                                      listEmptyMessage="-"
                                      isClickable
                                    />
                                  </Persons>
                                </Reference>
                              )
                            })}
                          </References>
                        </Tag>
                      )
                    })}
                  </>
                )}
              </TagsOfProject>
            </PersonsContent>
          </MindMapContent>
        </TransformComponent>
      </TransformWrapper>
    </MindMapContainer>
  )
}
