import { FormEvent, useState, useContext } from 'react'
import { Box, Button, Text, Textarea, TextInput } from '@og-ui/react'
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
} from '../../api/responsesTypes/IPersonsResponse'
import { IRef } from '../../api/responsesTypes/IProjcetResponse'
import { ProjectsContext } from '../../contexts/projects'
import { useRouter } from 'next/router'
import { ListEmpty } from '../../components/ListEmpty'
import { Refs } from '../../components/Refs'
import { InputRadio } from '../../components/InputRadio'
import { Avatares } from '../../components/Avatares'
import { ResponseInfoApi } from '../ResponseInfoApi'

interface IObjetiveEditorProps {
  isNew?: boolean
  objective?: IObjective
  projectId: string
  personId: string
  persons: IPersonsResponse[]
  refs: IRef[]
  permission: 'view' | 'edit' | 'comment' | undefined
}

export function ObjectiveEditor({
  isNew = false,
  objective,
  projectId,
  personId,
  persons,
  refs,
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

  const filteredRefs = refs?.filter((ref) => {
    const idAddedRef = !person?.objectives?.find(
      (objective) => objective.id === ref.object.id,
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

  function handleSelectRef(ref: IRef) {
    setRefSelected(ref.object.id as string)
    setTitle(ref.object.title as string)
    setDescription(ref.object.description as string)
  }

  async function saveRef() {
    const ref = refs.find((ref) => ref.object.id === refSelected) as IRef

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
      ref.object.id as string,
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
              <Button
                type="button"
                className="goBack"
                wid="hug"
                icon={<CaretCircleDoubleLeft weight="bold" />}
                onClick={() =>
                  router.push(`/project/${projectId}/persons/${personId}`)
                }
              />
            </EditorHeader>
            {isNew && filteredRefs && filteredRefs[0] && !refSelected && (
              <Refs
                onSelectRef={handleSelectRef}
                refs={filteredRefs}
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
                <TextInput
                  variant={errorIn === 'title' ? 'denied' : 'default'}
                  value={title}
                  icon={<Crosshair />}
                  placeholder={objective?.title}
                  onChange={(e) => {
                    if (refSelected) setRefSelected('')
                    permission === 'edit' && setTitle(e.target.value)
                  }}
                  disabled={permission !== 'edit'}
                />
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
                    <Button
                      type="submit"
                      align="center"
                      className="save"
                      label="Salvar"
                      icon={<FileArrowUp weight="bold" />}
                    />
                    <Button
                      type="button"
                      align="center"
                      className="cancel"
                      label="Cancelar"
                      icon={<FileX weight="bold" />}
                      onClick={() =>
                        router.push(`/project/${projectId}/persons/${personId}`)
                      }
                    />
                  </div>
                </>
              )}
            </FormContainer>

            {permission === 'edit' && !isNew && objective && (
              <Button
                type="button"
                label="Apagar"
                icon={<Trash />}
                align="center"
                css={{
                  marginTop: '$20',
                  background: 'DarkRed',
                  padding: '$2',
                }}
                onClick={() => setOnOpenDelete(true)}
              />
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
              <Button
                type="button"
                css={{
                  background: 'DarkRed',
                }}
                align="center"
                icon={<Trash weight="bold" />}
                label="Apagar permanentemente"
                onClick={() => handleDeleteObjective()}
              />
              <Button
                type="button"
                align="center"
                icon={<XSquare weight="bold" />}
                label="Cancelar"
                onClick={() => setOnOpenDelete(false)}
              />
            </Box>
          </DeletePopUp>
        )}
      </ObjectiveEditorContainer>
    </>
  )
}
