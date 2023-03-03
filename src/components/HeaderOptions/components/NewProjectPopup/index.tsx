import { ButtonIcon, ButtonLabel } from '@components/usefull/Button'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { ProjectsContext } from '@contexts/projects'
import { useRouter } from 'next/router'
import { FilePlus, XCircle } from 'phosphor-react'
import { FormEvent, useContext, useState } from 'react'
// import { InputRadio } from '../../../InputRadio'
import {
  HeaderNewProject,
  Input,
  NewProjectForm,
  NewProjectPopupContainer,
  Popup,
  Submit,
} from './styles'

interface INewProjectPopupProps {
  newProjectIsOpen: boolean
  setNewProjectIsOpen: (newState: boolean) => void
}

// const typesOfProjects = [
//   { label: 'Book', value: 'book' },
//   { label: 'RPG', value: 'rpg' },
//   { label: 'Gameplay', value: 'gameplay' },
//   { label: 'RoadMap', value: 'roadMap' },
// ]

export function NewProjectPopup({
  newProjectIsOpen,
  setNewProjectIsOpen,
}: INewProjectPopupProps) {
  const { createProject } = useContext(ProjectsContext)

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

  const router = useRouter()

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

    const idNewProject = await createProject(newProject)
    setNewProjectIsOpen(false)

    router.push(`/project/${idNewProject}`)
  }

  return (
    <NewProjectPopupContainer>
      <Popup>
        <HeaderNewProject>
          <button
            className="close"
            type="button"
            onClick={() => setNewProjectIsOpen(false)}
          >
            <XCircle size={32} />
          </button>
          <Text as={'h3'} size={'lg'} weight={'bold'} spacing={'maximum'}>
            Novo projeto
          </Text>
        </HeaderNewProject>
        <NewProjectForm onSubmit={handleNewProject}>
          <Input as="label" size="xs">
            Nome do projeto
            <TextInputRoot variant={errorIn === 'name' ? 'denied' : 'default'}>
              <TextInputInput
                placeholder="Insira o nome do projeto"
                onChange={(e) => setName(e.target.value)}
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
          <Submit align="center" wid="full">
            <ButtonIcon>
              <FilePlus />
            </ButtonIcon>

            <ButtonLabel>Criar projeto</ButtonLabel>
          </Submit>
        </NewProjectForm>
      </Popup>
    </NewProjectPopupContainer>
  )
}
