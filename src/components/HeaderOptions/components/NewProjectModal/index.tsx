import * as Dialog from '@radix-ui/react-dialog'
import { ButtonIcon, ButtonLabel } from '@components/usefull/Button'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { ProjectsContext } from '@contexts/projects'
import { useRouter } from 'next/router'
import { FilePlus, X } from 'phosphor-react'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
// import { InputRadio } from '../../../InputRadio'
import {
  Input,
  NewProjectForm,
  Submit,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalClose,
} from './styles'

// const typesOfProjects = [
//   { label: 'Book', value: 'book' },
//   { label: 'RPG', value: 'rpg' },
//   { label: 'Gameplay', value: 'gameplay' },
//   { label: 'RoadMap', value: 'roadMap' },
// ]

export function NewProjectModal() {
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

    router.push(`/project/${idNewProject}`)
  }

  return (
    <Dialog.Portal>
      <ModalOverlay />

      <ModalContent>
        <ModalClose>
          <X size={20} />
        </ModalClose>

        <ModalTitle asChild>
          <Text as={'h3'}>Novo projeto</Text>
        </ModalTitle>

        <NewProjectForm onSubmit={handleNewProject}>
          <Input as="label" size="xs">
            Nome do projeto
            <TextInputRoot variant={errorIn === 'name' ? 'denied' : 'default'}>
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
          <Submit align="center" wid="full" variant="noShadow" size="sm">
            <ButtonIcon>
              <FilePlus />
            </ButtonIcon>

            <ButtonLabel>Criar projeto</ButtonLabel>
          </Submit>
        </NewProjectForm>
      </ModalContent>
    </Dialog.Portal>
  )
}
