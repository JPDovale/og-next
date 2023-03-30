import { ButtonIcon, ButtonLabel } from '@components/usefull/Button'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { ProjectsContext } from '@contexts/projects'
import { FilePlus } from 'phosphor-react'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
// import { InputRadio } from '../../../InputRadio'
import { Input, NewProjectForm, Submit } from './styles'
import { ModalContent } from '@components/usefull/ModalContent'
import { Toast } from '@components/usefull/Toast'

// const typesOfProjects = [
//   { label: 'Book', value: 'book' },
//   { label: 'RPG', value: 'rpg' },
//   { label: 'Gameplay', value: 'gameplay' },
//   { label: 'RoadMap', value: 'roadMap' },
// ]

export function NewProjectModal() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  const { createProject, loading } = useContext(ProjectsContext)

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

    const isCreated = await createProject(newProject)

    if (isCreated) {
      setSuccessToastOpen(true)
      setName('')
      setErrorIn('')
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
        <Submit
          disabled={loading}
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
