import { FormEvent, useState, useContext } from 'react'
import { Box } from '@components/usefull/Box'
import {
  CaretCircleDoubleLeft,
  Crosshair,
  FileArrowUp,
  FileX,
  Skull,
  SmileyXEyes,
  Textbox,
  Trash,
  UserMinus,
  UsersThree,
  XSquare,
} from 'phosphor-react'
import {
  DeletePopUp,
  EditorHeader,
  FormContainer,
  InputContainer,
  ObjectiveEditorContainer,
  ShadowPopUp,
} from './styles'
import {
  IObjective,
  IPersonsResponse,
} from '@api/responsesTypes/IPersonsResponse'
import { ProjectsContext } from '@contexts/projects'
import { useRouter } from 'next/router'
import { ResponseInfoApi } from '@components/usefull/ResponseInfoApi'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Refs } from '@components/ProjectsComponents/Refs'
import { InputRadio } from '@components/usefull/InputRadio'
import { Avatares } from '@components/usefull/Avatares'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { IArchive } from '@api/responsesTypes/IBoxResponse'

interface IObjetiveEditorProps {
  isNew?: boolean
  objective?: IObjective
  projectId: string
  personId: string
  persons: IPersonsResponse[]
  referenceArchives: IArchive[] | undefined
  permission: 'view' | 'edit' | 'comment' | undefined
}

export function ObjectiveEditor({
  isNew = false,
  objective,
  projectId,
  personId,
  persons,
  referenceArchives,
  permission,
}: IObjetiveEditorProps) {
  const [isInitialChangeSupporting, setIsInitialChangeSupporting] =
    useState(true)
  const [isInitialChangeAvoider, setIsInitialChangeAvoider] = useState(true)
  const [avoiders, setAvoiders] = useState<IPersonsResponse[] | undefined>(
    undefined,
  )
  const [supporting, setSupporting] = useState<IPersonsResponse[] | undefined>(
    undefined,
  )
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [objectified, setObjectified] = useState<boolean | undefined>(undefined)
  const [errorIn, setErrorIn] = useState('')
  const [refSelected, setRefSelected] = useState('')
  const [onOpenDelete, setOnOpenDelete] = useState(false)

  const {
    updateObjective,
    error,
    createObjective,
    saveRefObjective,
    setError,
    deleteObjective,
  } = useContext(ProjectsContext)

  const router = useRouter()

  const person = persons.find(
    (person) => person.id === personId,
  ) as IPersonsResponse

  const personsThisProject = persons.filter(
    (person) => person.defaultProject === projectId,
  )

  const initialSupporters = objective
    ? supporting ||
      personsThisProject.filter((person) => {
        const isSupporter = !!objective.supporting.find(
          (support) => support === person.id,
        )

        return isSupporter
      })
    : supporting

  const initialAvoiders = objective
    ? avoiders ||
      personsThisProject.filter((person) => {
        const isAvoider = !!objective.avoiders.find(
          (avoider) => avoider === person.id,
        )

        return isAvoider
      })
    : avoiders

  const restPersons = personsThisProject.filter((person) => {
    const isAdded =
      !(
        avoiders?.find((avoider) => avoider.id === person.id) ||
        initialAvoiders?.find((avoider) => avoider.id === person.id)
      ) &&
      !(
        supporting?.find((supporter) => supporter.id === person.id) ||
        initialSupporters?.find((supporter) => supporter.id === person.id)
      )

    return isAdded
  })

  const filteredPersons = restPersons.filter((person) => person.id !== personId)

  const filteredArchives = referenceArchives?.filter((file) => {
    const idAddedRef = !person?.objectives?.find(
      (objective) => objective.id === file.archive.id,
    )

    return idAddedRef
  })

  function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (refSelected) return saveRef()
    if (isNew) return newObjective()
    saveObjective()
  }

  function handleRemoveSupporter(id: string) {
    let supporters: IPersonsResponse[]

    if (isInitialChangeSupporting) {
      supporters = [...(initialSupporters || [])]

      const updatedSupporters = supporters.filter(
        (supporter) => supporter.id !== id,
      )
      supporters = updatedSupporters

      setIsInitialChangeSupporting(false)
      return setSupporting([...supporters])
    }

    if (!supporting) return
    const updatedSupporters = supporting.filter(
      (supporter) => supporter.id !== id,
    )
    supporters = updatedSupporters

    setSupporting([...supporters])
  }

  function handleRemoveAvoider(id: string) {
    let avoidersMoc: IPersonsResponse[]

    if (isInitialChangeAvoider) {
      avoidersMoc = [...(initialAvoiders || [])]

      const updatedAvoiders = avoidersMoc.filter(
        (supporter) => supporter.id !== id,
      )
      avoidersMoc = updatedAvoiders

      setIsInitialChangeAvoider(false)
      return setAvoiders([...avoidersMoc])
    }

    if (!avoiders) return
    const updatedAvoiders = avoiders.filter((avoider) => avoider.id !== id)
    avoidersMoc = updatedAvoiders

    setAvoiders([...avoidersMoc])
  }

  function handleAddPersonOnOne(to: 'supporting' | 'avoider', id: string) {
    if (to === 'avoider') {
      const personToAdd = restPersons.find(
        (person) => person.id === id,
      ) as IPersonsResponse
      const updatedAvoiders = [personToAdd, ...(initialAvoiders || [])]
      setAvoiders(updatedAvoiders)
    }

    if (to === 'supporting') {
      const personToAdd = restPersons.find(
        (person) => person.id === id,
      ) as IPersonsResponse
      const updatedSupporting = [personToAdd, ...(initialSupporters || [])]
      setSupporting(updatedSupporting)
    }
  }

  async function saveObjective() {
    const avoidersToObjective = avoiders?.map((avoiders) => avoiders.id)
    const supportersToObjective = supporting?.map((supporter) => supporter.id)

    let objectifiedToObjective = objective?.objectified || false

    if (objectified !== undefined) {
      objectifiedToObjective = objectified
    }

    const updatedObjective: IObjective = {
      title: title || objective?.title || '',
      description: description || objective?.description || '',
      avoiders: avoidersToObjective || objective?.avoiders || [],
      supporting: supportersToObjective || objective?.supporting || [],
      objectified: objectifiedToObjective,
    }

    const isEdited = await updateObjective(
      updatedObjective,
      personId,
      objective?.id as string,
    )

    if (isEdited) {
      router.push(`/project/${projectId}/persons/${personId}`)
    }
  }

  async function newObjective() {
    if (!title) return setErrorIn('title')
    if (!description) return setErrorIn('description')

    const avoidersToObjective = avoiders?.map((avoiders) => avoiders.id)
    const supportersToObjective = supporting?.map((supporter) => supporter.id)

    const newObjective: IObjective = {
      title,
      description,
      objectified: objectified || false,
      avoiders: avoidersToObjective || [],
      supporting: supportersToObjective || [],
    }

    const isCreated = await createObjective(newObjective, personId, projectId)

    if (isCreated) {
      router.push(`/project/${projectId}/persons/${personId}`)
    }
  }

  function handleSelectRef(file: IArchive) {
    setRefSelected(file.archive.id as string)
    setTitle(file.archive.title as string)
    setDescription(file.archive.description as string)
  }

  async function saveRef() {
    const ref = referenceArchives?.find(
      (file) => file.archive.id === refSelected,
    ) as IArchive

    const avoidersToObjective = avoiders?.map(
      (avoiders) => avoiders.id,
    ) as string[]
    const supportersToObjective = supporting?.map((supporter) => supporter.id)

    const objective = {
      objectified: objectified || false,
      avoiders: avoidersToObjective || [],
      supporting: supportersToObjective || [],
    }

    const isSaved = await saveRefObjective(
      objective,
      personId,
      projectId,
      ref.archive.id as string,
    )

    if (isSaved) {
      router.push(`/project/${projectId}/persons/${personId}`)
    }
  }

  async function handleDeleteObjective() {
    if (!objective) return

    setOnOpenDelete(false)
    router.push(`/project/${projectId}/persons/${personId}`)

    await deleteObjective({ objectiveId: objective?.id as string, personId })
  }

  return (
    <>
      {error && (
        <ShadowPopUp>
          <ResponseInfoApi
            error={error}
            onClosePopUp={() => setError(undefined)}
            isPopUp
          />
        </ShadowPopUp>
      )}

      <ObjectiveEditorContainer>
        {permission !== 'edit' && isNew ? (
          <ListEmpty
            message="OPA! Parece que você caiu em um lugar que você não tem acesso..."
            icon={<SmileyXEyes size={80} />}
          />
        ) : (
          <>
            <EditorHeader>
              <Text as="span">
                <Textbox size={24} />
                {isNew ? 'Criar objetivo' : `Editar objetivo`}
              </Text>
              <ButtonRoot
                type="button"
                className="goBack"
                wid="hug"
                onClick={() =>
                  router.push(`/project/${projectId}/persons/${personId}`)
                }
              >
                <ButtonIcon>
                  <CaretCircleDoubleLeft weight="bold" />
                </ButtonIcon>
              </ButtonRoot>
            </EditorHeader>
            {isNew &&
              filteredArchives &&
              filteredArchives[0] &&
              !refSelected && (
                <Refs
                  onSelectRef={handleSelectRef}
                  referenceArchives={filteredArchives}
                  title="Reaproveite objetivos já criados"
                />
              )}
            <Text
              size="md"
              css={{
                color: '$errorDefault',
              }}
              weight="bold"
              family="body"
            >
              {error?.message}
            </Text>
            <FormContainer onSubmit={handleSubmitForm}>
              <InputContainer as="label" family="body">
                <p>Titulo do objetivo</p>
                <TextInputRoot
                  variant={errorIn === 'title' ? 'denied' : 'default'}
                  disabled={permission !== 'edit'}
                >
                  <TextInputIcon>
                    <Crosshair />
                  </TextInputIcon>

                  <TextInputInput
                    value={title}
                    placeholder={objective?.title}
                    onChange={(e) => {
                      if (refSelected) setRefSelected('')
                      permission === 'edit' && setTitle(e.target.value)
                    }}
                    disabled={permission !== 'edit'}
                  />
                </TextInputRoot>
              </InputContainer>

              <InputContainer as="label" family="body">
                <p>Descrição</p>
                <Textarea
                  variant={errorIn === 'description' ? 'denied' : 'default'}
                  value={description}
                  onChange={(e) => {
                    if (refSelected) setRefSelected('')
                    permission === 'edit' && setDescription(e.target.value)
                  }}
                  placeholder={objective?.description}
                  disabled={permission !== 'edit'}
                />
              </InputContainer>

              <InputContainer as="label" family="body">
                <p>O objetivo será concretizado?</p>
                {permission === 'edit' && (
                  <InputRadio
                    values={[
                      { label: 'Sim', value: true },
                      { label: 'Não', value: false },
                    ]}
                    setState={setObjectified}
                    state={objectified}
                  />
                )}
              </InputContainer>
              {permission !== 'edit' && (
                <Text
                  css={{
                    color: objective?.objectified
                      ? '$successDefault'
                      : '$errorDefault',
                    marginTop: '-$4',
                  }}
                >
                  {objective?.objectified ? 'Sim' : 'Não'}
                </Text>
              )}

              <InputContainer as="label" family="body">
                <p>
                  Apoiadores <UsersThree size={18} />
                </p>
              </InputContainer>

              <Avatares
                persons={initialSupporters || []}
                functionInternalButton={handleRemoveSupporter}
                internalButtonIcon={
                  permission === 'edit' && <UserMinus weight="bold" />
                }
                listEmptyMessage="Nenhum personagem foi adicionado aos apoiadores ainda"
                listEmptyIcon={<UsersThree size={32} />}
              />

              <InputContainer as="label" family="body">
                <p>
                  Contras <Skull size={18} />
                </p>
              </InputContainer>
              <Avatares
                persons={initialAvoiders || []}
                functionInternalButton={handleRemoveAvoider}
                internalButtonIcon={
                  permission === 'edit' && <UserMinus weight="bold" />
                }
                listEmptyMessage="Nenhum personagem foi adicionado aos contras ainda"
                listEmptyIcon={<Skull size={32} />}
              />

              {permission === 'edit' && (
                <>
                  <InputContainer as="label" family="body">
                    <p>Todos os personagens</p>
                  </InputContainer>
                  <Avatares
                    persons={filteredPersons}
                    firstButtonIcon={<UsersThree weight="bold" />}
                    firstButtonFunction={handleAddPersonOnOne}
                    firstButtonKey={'supporting'}
                    secondaryButtonIcon={<Skull weight="bold" />}
                    secondaryButtonFunction={handleAddPersonOnOne}
                    secondButtonKey={'avoider'}
                    listEmptyMessage="Nenhum personagem que possa ser adicionado"
                  />
                  <div className="buttons">
                    <ButtonRoot type="submit" align="center" className="save">
                      <ButtonIcon>
                        <FileArrowUp weight="bold" />
                      </ButtonIcon>

                      <ButtonLabel>Salvar</ButtonLabel>
                    </ButtonRoot>

                    <ButtonRoot
                      type="button"
                      align="center"
                      className="cancel"
                      onClick={() =>
                        router.push(`/project/${projectId}/persons/${personId}`)
                      }
                    >
                      <ButtonIcon>
                        <FileX weight="bold" />
                      </ButtonIcon>

                      <ButtonLabel>Cancelar</ButtonLabel>
                    </ButtonRoot>
                  </div>
                </>
              )}
            </FormContainer>

            {permission === 'edit' && !isNew && objective && (
              <ButtonRoot
                type="button"
                align="center"
                css={{
                  marginTop: '$20',
                  background: 'DarkRed',
                  padding: '$2',
                }}
                onClick={() => setOnOpenDelete(true)}
              >
                <ButtonIcon>
                  <Trash />
                </ButtonIcon>

                <ButtonLabel>Apagar</ButtonLabel>
              </ButtonRoot>
            )}
          </>
        )}

        {!isNew && onOpenDelete && objective && (
          <DeletePopUp>
            <Box as="div">
              <Text size="sm">
                Tem certeza que quer apagar o objetivo: {objective?.title}? Será
                impossível desfazer isso.
              </Text>
              <ButtonRoot
                type="button"
                css={{
                  background: 'DarkRed',
                }}
                align="center"
                onClick={() => handleDeleteObjective()}
              >
                <ButtonIcon>
                  <Trash weight="bold" />
                </ButtonIcon>

                <ButtonLabel>Apagar permanentemente</ButtonLabel>
              </ButtonRoot>

              <ButtonRoot
                type="button"
                align="center"
                onClick={() => setOnOpenDelete(false)}
              >
                <ButtonIcon>
                  <XSquare weight="bold" />
                </ButtonIcon>

                <ButtonLabel>Cancelar</ButtonLabel>
              </ButtonRoot>
            </Box>
          </DeletePopUp>
        )}
      </ObjectiveEditorContainer>
    </>
  )
}
