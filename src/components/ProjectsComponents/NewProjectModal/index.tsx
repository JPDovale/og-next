import { ButtonIcon, ButtonLabel } from '@components/usefull/Button'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { FilePlus } from 'phosphor-react'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
// import { InputRadio } from '../../../InputRadio'
import { Input, NewProjectForm, Submit } from './styles'
import { ModalContent } from '@components/usefull/ModalContent'
import { Toast } from '@components/usefull/Toast'
import { useProjects } from '@hooks/useProjects'
import { IError } from '@@types/errors/IError'
import { ToastError } from '@components/usefull/ToastError'
import { InterfaceContext } from '@contexts/interface'

// const typesOfProjects = [
//   { label: 'Book', value: 'book' },
//   { label: 'RPG', value: 'rpg' },
//   { label: 'Gameplay', value: 'gameplay' },
//   { label: 'RoadMap', value: 'roadMap' },
// ]

interface INewProjectModalProps {
  onSuccessCreateProject: () => void
}

export function NewProjectModal({
  onSuccessCreateProject,
}: INewProjectModalProps) {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [error, setError] = useState<IError | null>(null)

  const { loadingProjects, refetchProjects, callEvent } = useProjects()
  const { theme } = useContext(InterfaceContext)

  const isDarkMode = theme === 'dark'

  const [
    isPrivate,
    // setIsPrivate
  ] = useState(false)
  const [
    type,
    // setType
  ] = useState('book')
  const [name, setName] = useState('')
  const [
    password,
    // setPassword
  ] = useState('')
  const [errorIn, setErrorIn] = useState('')

  async function handleNewProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name) {
      return setErrorIn('name')
    }

    if (!type) {
      return setErrorIn('type')
    }

    const newProject = {
      name,
      private: isPrivate,
      type,
      password,
    }

    const { resolved, error } = await callEvent.createProject(newProject)

    if (resolved) {
      setSuccessToastOpen(true)
      setName('')
      setErrorIn('')
      onSuccessCreateProject()
      await refetchProjects()
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <ModalContent title="Novo projeto">
      <Toast
        setOpen={setSuccessToastOpen}
        open={successToastOpen}
        title="Projeto criado"
        message="Você acabou de criar um novo projeto... Acesse seus projetos para ver"
      />

      <ToastError error={error} setError={setError} />

      <NewProjectForm onSubmit={handleNewProject} darkMode={isDarkMode}>
        <Input as="label" size="xs" css={{ color: isDarkMode ? '$white' : '' }}>
          Nome do projeto
          <TextInputRoot
            css={{ background: !isDarkMode ? '$gray500' : '' }}
            variant={errorIn === 'name' ? 'denied' : 'default'}
          >
            <TextInputInput
              placeholder="Insira o nome do projeto"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              value={name}
            />
          </TextInputRoot>
        </Input>
        {/* <Input as="label" size="xs">
            Selecione o tipo do projeto {type}
            <Text
              as="span"
              size="xxs"
              css={{
                color: '$errorDefault',
              }}
            >
              {errorIn === 'type' &&
                'Você precisa definir um tipo para continuar'}
            </Text>
            <InputRadio values={typesOfProjects} setState={setType} />
          </Input> */}
        {/* <Input as="label" size="xs">
            O projeto é privado {isPrivate}
            <InputRadio
              values={[
                { label: 'Sim', value: true },
                { label: 'Não', value: false },
              ]}
              setState={setIsPrivate}
            />
          </Input>
          {isPrivate === true && (
            <Input as="label" size="xs">
              Senha do projeto
              <TextInputRoot
                placeholder="Insira uma senha para o projeto"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Input>
          )} */}
        <Submit
          disabled={loadingProjects}
          align="center"
          wid="full"
          variant="noShadow"
          size="sm"
        >
          <ButtonIcon>
            <FilePlus />
          </ButtonIcon>

          <ButtonLabel>Criar projeto</ButtonLabel>
        </Submit>
      </NewProjectForm>
    </ModalContent>
  )
}
