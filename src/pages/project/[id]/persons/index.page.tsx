import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/router'
import { MagnifyingGlass, UserFocus, UserPlus } from 'phosphor-react'
import { useContext, useState } from 'react'

import {
  FastAccessPersons,
  NewPersonFormContainer,
  PersonsContainer,
  QueryInputContainer,
} from './styles'

import { NextSeo } from 'next-seo'
import { ProjectsContext } from '@contexts/projects'
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
import { ToastError } from '@components/usefull/ToastError'
import { Toast } from '@components/usefull/Toast'
import { NewPersonModal } from '@components/PersonsComponents/NewPersonModal'

export default function PersonsPage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [query, setQuery] = useState('')

  const { loading, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}`)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { project, projectName, queryPerson } = useProject(id as string)
  const finalPersonsToShow = queryPerson(query)

  return (
    <>
      <NextSeo title={`${projectName}-Personagens | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Personagens']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        <ToastError error={error} setError={setError} />
        <Toast
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          title="Personagem criada"
          message="Parabéns! Você acabou de criar uma nova personagem! Acesse a aba de personagens para ver."
        />

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
            <TextInputRoot size="xs" variant="noShadow">
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

        <FastAccessPersons>
          <Text size="xs">Acesso rápido:</Text>
          <Avatares
            size={smallWindow ? 'xsm' : 'sm'}
            columns={12}
            listEmptyMessage={
              loading ? 'Carregando...' : 'Nenhum personagem foi criado ainda'
            }
            persons={finalPersonsToShow}
            isClickable
          />
        </FastAccessPersons>

        <PersonsContainer>
          {finalPersonsToShow[0] ? (
            finalPersonsToShow.map((person) => {
              return <CardPerson key={person.id} person={person} isNotPreview />
            })
          ) : (
            <ListEmpty
              isLoading={loading}
              message="Você ainda não criou nenhum personagem para esse projeto."
              icon={<UserFocus size={loading ? 0 : 90} />}
            />
          )}
        </PersonsContainer>
      </ProjectPageLayout>
    </>
  )
}
