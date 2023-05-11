import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/router'
import { MagnifyingGlass, UserFocus, UserPlus } from 'phosphor-react'
import { useState } from 'react'

import {
  FastAccessPersons,
  NewPersonFormContainer,
  PersonsContainer,
  QueryInputContainer,
} from './styles'

import { NextSeo } from 'next-seo'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useWindowSize } from '@hooks/useWindow'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { CardPerson } from '@components/PersonsComponents/CardPerson'
import { Avatares } from '@components/usefull/Avatares'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { Toast } from '@components/usefull/Toast'
import { NewPersonModal } from '@components/PersonsComponents/NewPersonModal'
import { ContainerGrid } from '@components/usefull/ContainerGrid'

export default function PersonsPage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [query, setQuery] = useState('')

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}`)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { project, projectName, queryPerson, loadingProject } = useProject(
    id as string,
  )
  const finalPersonsToShow = queryPerson(query)

  return (
    <>
      <NextSeo title={`${projectName}-Personagens | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          title="Personagem criada"
          message="Parabéns! Você acabou de criar uma nova personagem! Acesse a aba de personagens para ver."
        />
        <ContainerGrid padding={0}>
          <NewPersonFormContainer>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <ButtonRoot
                  size="xs"
                  variant="noShadow"
                  wid="hug"
                  css={{ float: 'right' }}
                >
                  <ButtonIcon>
                    <UserPlus weight="bold" />
                  </ButtonIcon>

                  {!smallWindow && <ButtonLabel>Criar personagem</ButtonLabel>}
                </ButtonRoot>
              </Dialog.Trigger>

              <NewPersonModal
                onSuccess={() => setSuccessToastOpen(true)}
                projectId={project?.id!}
              />
            </Dialog.Root>

            <QueryInputContainer>
              <TextInputRoot
                css={{ padding: '$2', width: '100%' }}
                variant="noShadow"
              >
                <TextInputIcon>
                  <MagnifyingGlass size={24} />
                </TextInputIcon>

                <TextInputInput
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Encontre um personagem"
                />
              </TextInputRoot>
            </QueryInputContainer>
          </NewPersonFormContainer>

          <ContainerGrid padding={4}>
            <Text weight="bold">Acesso rápido:</Text>
            <FastAccessPersons>
              <Avatares
                size="xsm"
                columns={18}
                listEmptyMessage={
                  loadingProject
                    ? 'Carregando...'
                    : 'Nenhum personagem foi criado ainda'
                }
                persons={finalPersonsToShow ?? []}
                isClickable
              />
            </FastAccessPersons>
          </ContainerGrid>

          <PersonsContainer
            isEmpty={!finalPersonsToShow || !finalPersonsToShow[0]}
          >
            {finalPersonsToShow && finalPersonsToShow[0] ? (
              finalPersonsToShow.map((person) => {
                return (
                  <CardPerson
                    key={person.id}
                    personId={person.id}
                    isNotPreview
                  />
                )
              })
            ) : (
              <ListEmpty
                isLoading={loadingProject}
                message="Você ainda não criou nenhum personagem para esse projeto."
                icon={<UserFocus size={loadingProject ? 0 : 90} />}
              />
            )}
          </PersonsContainer>
        </ContainerGrid>
      </ProjectPageLayout>
    </>
  )
}
