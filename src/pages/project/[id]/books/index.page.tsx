import * as Dialog from '@radix-ui/react-dialog'
import { CardBook } from '@components/BooksComponents/CardBook'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Books } from 'phosphor-react'
import { useState } from 'react'

import { BooksContainer, NewBookButtonContainer } from './styles'
import { NewBookModal } from './components/NewBookModal'
import { Toast } from '@components/usefull/Toast'

export default function BooksPage() {
  const [modalNewBookIsOpen, setModalNewBookIsOpen] = useState(false)
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}`)

  const { project, projectName, booksThisProject, loadingProject } = useProject(
    id as string,
  )

  return (
    <>
      <NextSeo title={`${projectName}-Livros | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Livros']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          title="Livro criado"
          message="Parabéns! Você acabou de criar um novo livro... Veja ele na aba de livos"
        />

        <Dialog.Root
          open={modalNewBookIsOpen}
          onOpenChange={setModalNewBookIsOpen}
        >
          <Dialog.Trigger asChild>
            <NewBookButtonContainer>
              <ButtonRoot align="center" size="sm">
                <ButtonIcon>
                  <Books />
                </ButtonIcon>

                <ButtonLabel>Criar novo livro</ButtonLabel>
              </ButtonRoot>
            </NewBookButtonContainer>
          </Dialog.Trigger>

          <NewBookModal
            onSuccess={() => setModalNewBookIsOpen(false)}
            openToast={() => setSuccessToastOpen(true)}
          />
        </Dialog.Root>

        <BooksContainer>
          {booksThisProject[0] ? (
            booksThisProject.map((book) => (
              <CardBook
                key={book.id}
                bookId={book.id}
                projectId={project?.id!}
              />
            ))
          ) : (
            <ListEmpty
              message="Você ainda não criou nenhum livro para esse projeto."
              icon={<Books size={48} />}
            />
          )}
        </BooksContainer>
      </ProjectPageLayout>
    </>
  )
}
