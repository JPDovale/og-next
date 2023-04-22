import { ShareForm } from './styles'
import { Envelope, Share } from 'phosphor-react'
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
import { ModalContent } from '@components/usefull/ModalContent'
import { InterfaceContext } from '@contexts/interface'

interface IShareProjectModalProps {
  projectId: string
}

export function ShareProjectModal({ projectId }: IShareProjectModalProps) {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [shareEmail, setShareEmail] = useState('')
  const [errorIn, setErrorIn] = useState('')
  const [sharePermission, setSharePermission] = useState('edit')

  const { error, setError } = useContext(ProjectsContext)
  const { theme } = useContext(InterfaceContext)

  const isDarkMode = theme === 'dark'

  const { projectName, usersInProject, loadingProject, callEvent } =
    useProject(projectId)

  async function handleShareProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (error) setError(undefined)
    if (!shareEmail) {
      return setErrorIn('email')
    }

    const userInExisteProject = usersInProject.find(
      (user) => user.email === shareEmail,
    )

    if (userInExisteProject) {
      return setErrorIn('email')
    }

    const shareProjectWithUserInfos = {
      email: shareEmail,
      permission: sharePermission,
    }

    const { resolved } = await callEvent.share(shareProjectWithUserInfos)

    if (resolved) {
      setSuccessToastOpen(true)
      setShareEmail('')
    }
  }

  return (
    <ModalContent title={`Pronto para compartilhar ${projectName}?`}>
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

      <ShareForm onSubmit={handleShareProject} darkMode={isDarkMode}>
        <Text size="xs" css={{ color: isDarkMode ? '$white' : '' }}>
          Informe o email do usuário que quer compartilhar o projeto
        </Text>

        <TextInputRoot
          variant={errorIn === 'email' ? 'denied' : 'default'}
          css={{ background: !isDarkMode ? '$gray500' : '' }}
        >
          <TextInputIcon>
            <Envelope />
          </TextInputIcon>

          <TextInputInput
            placeholder="jonas@ognare.com"
            type="email"
            onChange={(e) => setShareEmail(e.target.value)}
            value={shareEmail}
            disabled={loadingProject}
          />
        </TextInputRoot>

        <Text size="xs" css={{ color: isDarkMode ? '$white' : '' }}>
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
          disabled={loadingProject}
        >
          <ButtonIcon>
            <Share />
          </ButtonIcon>

          <ButtonLabel>Compartilhar</ButtonLabel>
        </ButtonRoot>
      </ShareForm>
    </ModalContent>
  )
}
