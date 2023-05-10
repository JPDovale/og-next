// import { Text } from '@components/usefull/Text'
// import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
// import { Avatares } from '@components/usefull/Avatares'
// import { useProject } from '@hooks/useProject'
// import { Text } from '@components/usefull/Text'
// import { useRouter } from 'next/router'
// import { ArrowCircleUp } from 'phosphor-react'
// import { useState } from 'react'
// import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
// import { CardProject } from '../CardProject'

import {
  // ButtonColapse,
  MindMapContainer,
  // MindMapContent,
  // Persons,
  // PersonsContent,
  // PersonsHeader,
  // ProjectContent,
  // Reference,
  // References,
  // Tag,
  // TagsOfProject,
} from './styles'

export function MindMap() {
  // const [tagsIsColapse, setTagsIsColapse] = useState(false)
  // const [personsIsColapse, setPersonsIsColapse] = useState(false)

  // const router = useRouter()
  // const { id } = router.query

  // const { project, personsThisProject } = useProject(id as string)

  return (
    <MindMapContainer>
      {/* <TransformWrapper
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
              <CardProject project={project!} />
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
                    Tags:
                    {personsThisProject[0]
                      ? boxesThisProject.length - 1
                      : boxesThisProject.length}
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
                    {boxesThisProject.length === 0 ||
                      (boxesThisProject.length === 1 &&
                        personsThisProject[0] && (
                          <Text family="body" css={{ alignSelf: 'center' }}>
                            Nenhuma tag foi criada ainda. Não se preocupe... as
                            tags são criada automaticamente, visando a criação
                            de conexões automáticas entro os vários elementos do
                            seu projeto.
                          </Text>
                        ))}

                    {boxesThisProject.map((box) => {
                      if (box.name === 'persons') return ''
                      if (box.name === 'books') return ''

                      return (
                        <Tag key={box.id}>
                          <div>
                            <Text size="xl">
                              {box.name}: {box.archives.length}
                              <Text as="span" family="body">
                                {box.createdAt}
                              </Text>
                            </Text>
                          </div>
                          <References>
                            {box.archives.map((file) => {
                              const personsInThisRef = file?.links?.map(
                                (link) => {
                                  const personFind = personsThisProject.find(
                                    (person) => person?.id === link.id,
                                  )
                                  return personFind
                                },
                              ) as IPersonsResponse[]

                              const finalPersons = personsInThisRef.filter(
                                (person) => person !== undefined,
                              )

                              return (
                                <Reference key={file.archive?.id}>
                                  <div>
                                    <Text>{file.archive?.title}</Text>

                                    <Text
                                      as="span"
                                      family="body"
                                      height="short"
                                    >
                                      {file.archive?.description}
                                    </Text>
                                  </div>

                                  <Persons inRef>
                                    <Avatares
                                      columns={5}
                                      persons={finalPersons}
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
      </TransformWrapper> */}
    </MindMapContainer>
  )
}
