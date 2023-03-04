import * as Dialog from '@radix-ui/react-dialog'
import { ModalOverlay } from '@components/HeaderOptions/components/NewProjectModal/styles'
import { ModalClose, ModalContent, ModalTitle, ShareForm } from './styles'
import { Envelope, Share, X } from 'phosphor-react'
import { useProject } from '@hooks/useProject'
import { Text } from '@components/usefull/Text'
import { FormEvent, useContext, useState } from 'react'
import { Toast } from '@components/usefull/Toast'
import { ProjectsContext } from '@contexts/projects'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { InputRadio } from '@components/usefull/InputRadio'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'

interface IShareProjectModalProps {
  projectId: string
}

export function ShareProjectModal({ projectId }: IShareProjectModalProps) {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [shareEmail, setShareEmail] = useState('')
  const [errorIn, setErrorIn] = useState('')
  const [sharePermission, setSharePermission] = useState('edit')

  const { error, setError, shareProject } = useContext(ProjectsContext)

  const { projectName, project } = useProject(projectId)

  async function handleShareProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (error) setError(undefined)
    if (!shareEmail) {
      return setErrorIn('email')
    }

    const userInExisteProject = project.users.find(
      (user) => user.email === shareEmail,
    )

    if (userInExisteProject) {
      return setErrorIn('email')
    }

    const shareProjectWithUserInfos = {
      email: shareEmail,
      permission: sharePermission,
      projectId: project.id as string,
    }

    const shared = await shareProject(shareProjectWithUserInfos)

    if (shared) {
      setSuccessToastOpen(true)
      setShareEmail('')
    }
  }

  return (
    <Dialog.Portal>
      <ModalOverlay />

      <ModalContent>
        <ModalClose>
          <X size={20} />
        </ModalClose>

        <ModalTitle asChild>
          <Text as={'h3'}>Pronto para compartilhar {projectName}?</Text>
        </ModalTitle>

        <Toast
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          title="Projeto compartilhado"
          message="Seu projeto foi compartilhado com sucesso"
          type="success"
        />

        <Toast
          open={errorIn === 'email'}
          setOpen={() => setErrorIn('')}
          title="Erro ao compartilhar"
          message="Parece que você já adicionou esse usuário ao projeto..."
        />

        <Toast
          open={!!error}
          setOpen={() => setError(undefined)}
          title={error?.title!}
          message={error?.message!}
        />

        <ShareForm onSubmit={handleShareProject}>
          <Text size="xs">
            Informe o email do usuário que quer compartilhar o projeto
          </Text>

          <TextInputRoot variant={errorIn === 'email' ? 'denied' : 'default'}>
            <TextInputIcon>
              <Envelope />
            </TextInputIcon>

            <TextInputInput
              placeholder="jonas@ognare.com"
              type="email"
              onChange={(e) => setShareEmail(e.target.value)}
              value={shareEmail}
            />
          </TextInputRoot>

          <Text size="xs">
            Esse usuário poderá{' '}
            {sharePermission === 'edit'
              ? 'editar '
              : sharePermission === 'comment'
              ? 'comentar n'
              : 'visualizar '}
            o projeto
          </Text>

          <InputRadio
            values={[
              { label: 'Editor', value: 'edit' },
              { label: 'Comentarista', value: 'comment' },
              { label: 'Visualização', value: 'view' },
            ]}
            setState={setSharePermission}
            state={sharePermission}
            withColorInBackground
          />

          <ButtonRoot
            type="submit"
            wid="middle"
            align="center"
            size="xs"
            variant="noShadow"
          >
            <ButtonIcon>
              <Share />
            </ButtonIcon>

            <ButtonLabel>Compartilhar</ButtonLabel>
          </ButtonRoot>
        </ShareForm>
      </ModalContent>
    </Dialog.Portal>
  )
}
