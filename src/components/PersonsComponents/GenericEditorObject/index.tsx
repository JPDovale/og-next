import { useEffect, FormEvent, useContext, useState } from 'react'
import {
  Brandy,
  CaretCircleDoubleLeft,
  Crosshair,
  FileArrowUp,
  FileX,
  Plus,
  SmileyXEyes,
  Textbox,
  Trash,
  X,
  XSquare,
} from 'phosphor-react'

import { GenericCardObject } from '../GenericCardObject'
import {
  DeletePopUp,
  EditorHeader,
  FormContainer,
  GenericEditorObjectContainer,
  InputContainer,
  ShadowPopUp,
  SubObjectForm,
  SubObjectFormContainer,
  SubObjects,
} from './styles'
import { useRouter } from 'next/router'
import { IEditorTo } from 'src/@types/editores/IEditorTo'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { ProjectsContext } from '@contexts/projects'
import { findRefs } from '@services/findRefs'
import { ResponseInfoApi } from '@components/usefull/ResponseInfoApi'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Refs } from '@components/ProjectsComponents/Refs'
import { InputRadio } from '@components/usefull/InputRadio'
import { Avatares } from '@components/usefull/Avatares'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { Box } from '@components/usefull/Box'
import { Textarea } from '@components/usefull/Textarea'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { IArchive } from '@api/responsesTypes/IBoxResponse'

interface ISubObject {
  title: string
  description: string
}

interface IGenericObject {
  id?: string
  title: string
  description: string
  subObjects?: ISubObject[]
  personId?: string
}

interface IGenericEditorProps {
  isNew: boolean
  editorTo: IEditorTo
  projectId: string
  personId: string
  referenceArchives: IArchive[] | undefined
  persons: IPersonsResponse[]
  object?: IGenericObject
  withSubObjects?: 'consequências' | 'exceções' | undefined
  isUniqueRelational?: boolean
  permission: 'view' | 'edit' | 'comment' | undefined
}

export function GenericEditorObject({
  isNew,
  editorTo,
  projectId,
  personId,
  referenceArchives,
  persons,
  object,
  withSubObjects,
  isUniqueRelational = false,
  permission,
}: IGenericEditorProps) {
  const [refSelected, setRefSelected] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errorIn, setErrorIn] = useState('')
  const [onOpenDelete, setOnOpenDelete] = useState(false)

  const [showSubObjectForm, setShowSubObjectForm] = useState(false)
  const [titleSubObject, setTitleSubObject] = useState('')
  const [descriptionSubObject, setDescriptionSubObject] = useState('')
  const [final, setFinal] = useState(false)
  const [personSelected, setPersonSelected] = useState('')
  const [subObjects, setSubObjects] = useState<ISubObject[]>([])

  const {
    error,
    setError,
    createObjectGeneric,
    saveRefObjectGeneric,
    updateObjectGeneric,
    deleteObjectGeneric,
  } = useContext(ProjectsContext)

  const router = useRouter()

  const person = persons.find(
    (person) => person.id === personId,
  ) as IPersonsResponse

  const filteredPersons = persons.filter((person) => person.id !== personId)
  const personsThisProject = filteredPersons.filter(
    (person) => person.defaultProject === projectId,
  )

  const filteredArchives = findRefs(editorTo, referenceArchives!, person)

  function handleSelectRef(file: IArchive) {
    setRefSelected(file.archive.id as string)
    setTitle(file.archive.title as string)
    setDescription(file.archive.description as string)
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (refSelected) {
      const ref = referenceArchives?.find(
        (file) => file.archive.id === refSelected,
      ) as IArchive

      const savedRef = await saveRefObjectGeneric(
        personId,
        projectId,
        ref.archive.id as string,
        editorTo,
        subObjects,
      )

      if (savedRef) {
        router.push(`/project/${projectId}/persons/${personId}`)
      }
      return
    }

    if (isNew) {
      if (!title) return setErrorIn('title')
      if (!description) return setErrorIn('description')
      if (isUniqueRelational && !personSelected) return setErrorIn('avatar')

      const newObject = {
        title,
        description,
        subObjects,
        isToDelete: false,
        personId: personSelected,
        final,
      }

      const isCreated = await createObjectGeneric(
        newObject,
        editorTo,
        person.id,
        projectId,
      )

      if (isCreated) {
        router.push(`/project/${projectId}/persons/${personId}`)
      }
      return
    }

    const newObject = {
      title: title || (object?.title as string),
      description: description || (object?.description as string),
      subObjects: subObjects || (object?.subObjects as ISubObject[]),
      isToDelete: false,
      personId: personSelected || (object?.personId as string),
      final,
    }

    const isUpdated = await updateObjectGeneric(
      newObject,
      personId,
      object?.id as string,
      editorTo,
    )

    if (isUpdated) {
      router.push(`/project/${projectId}/persons/${personId}`)
    }
  }

  function handleSaveNewSubObject() {
    const newSubObject = {
      title: titleSubObject,
      description: descriptionSubObject,
    }

    setSubObjects([newSubObject, ...subObjects])
    setShowSubObjectForm(false)
    setTitleSubObject('')
    setDescriptionSubObject('')
  }

  function handleRemoveSubObject(object: IGenericObject) {
    const filteredSubObjects = subObjects.filter(
      (subObject) =>
        object.title !== subObject.title &&
        object.description !== subObject.description,
    )

    setSubObjects(filteredSubObjects)
  }

  async function handleDeleteObject() {
    if (!object) return

    const objectToDelete = {
      title: object?.title,
      isToDelete: false,
      description: object?.description,
    }

    await deleteObjectGeneric(
      objectToDelete,
      personId,
      object?.id as string,
      editorTo,
    )
    setOnOpenDelete(false)
    router.push(`/project/${projectId}/persons/${personId}`)
  }

  useEffect(() => {
    if (!isNew && object?.subObjects) {
      setSubObjects(object.subObjects)
    }
  }, [isNew, object?.subObjects])

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

      <GenericEditorObjectContainer subObjectsFormIsVisible={showSubObjectForm}>
        {permission !== 'edit' && isNew ? (
          <ListEmpty
            message="OPA! Parece que você caiu em um lugar que você não tem acesso..."
            icon={<SmileyXEyes size={80} />}
          />
        ) : (
          <>
            {showSubObjectForm ? (
              <>
                {permission === 'edit' && (
                  <SubObjectFormContainer isVisible={showSubObjectForm}>
                    <SubObjectForm>
                      <EditorHeader>
                        <Text as="span">
                          <Textbox size={24} />
                          Criar {withSubObjects}
                        </Text>

                        <ButtonRoot
                          type="button"
                          className="goBack"
                          wid="hug"
                          onClick={() => setShowSubObjectForm(false)}
                        >
                          <ButtonIcon>
                            <CaretCircleDoubleLeft weight="bold" />
                          </ButtonIcon>
                        </ButtonRoot>
                      </EditorHeader>
                      <InputContainer as="label" family="body">
                        <p>Titulo da {withSubObjects}</p>
                        <TextInputRoot
                          variant={
                            errorIn === 'titleSubObject' ? 'denied' : 'default'
                          }
                          disabled={permission !== 'edit'}
                        >
                          <TextInputIcon>
                            <Crosshair />
                          </TextInputIcon>

                          <TextInputInput
                            value={titleSubObject}
                            onChange={(e) =>
                              permission === 'edit' &&
                              setTitleSubObject(e.target.value)
                            }
                            disabled={permission !== 'edit'}
                          />
                        </TextInputRoot>
                      </InputContainer>

                      <InputContainer as="label" family="body">
                        <p>Descrição</p>
                        <Textarea
                          variant={
                            errorIn === 'descriptionSubObject'
                              ? 'denied'
                              : 'default'
                          }
                          value={descriptionSubObject}
                          onChange={(e) =>
                            permission === 'edit' &&
                            setDescriptionSubObject(e.target.value)
                          }
                          disabled={permission !== 'edit'}
                        />
                      </InputContainer>

                      <div className="buttons">
                        <ButtonRoot
                          type="button"
                          align="center"
                          className="save"
                          onClick={handleSaveNewSubObject}
                        >
                          <ButtonIcon>
                            <FileArrowUp weight="bold" />
                          </ButtonIcon>

                          <ButtonLabel>Salvar</ButtonLabel>
                        </ButtonRoot>

                        <ButtonRoot
                          type="button"
                          align="center"
                          className="cancel"
                          onClick={() => {
                            setShowSubObjectForm(false)
                            setTitleSubObject('')
                            setDescriptionSubObject('')
                          }}
                        >
                          <ButtonIcon>
                            <FileX weight="bold" />
                          </ButtonIcon>

                          <ButtonLabel>Cancelar</ButtonLabel>
                        </ButtonRoot>
                      </div>
                    </SubObjectForm>
                  </SubObjectFormContainer>
                )}
              </>
            ) : (
              <>
                <EditorHeader>
                  <Text as="span">
                    <Textbox size={24} />
                    {isNew ? `Criar ${editorTo}` : `Editar ${editorTo}`}
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
                      title={`Reaproveite ${editorTo}s já criados`}
                    />
                  )}

                {/* <Text
                size="md"
                css={{
                  color: '$errorDefault',
                }}
                weight="bold"
                family="body"
              >
                {error?.message}
              </Text> */}

                <FormContainer onSubmit={handleSubmitForm}>
                  <InputContainer as="label" family="body">
                    <p>Titulo do {editorTo}</p>
                    <TextInputRoot
                      variant={errorIn === 'title' ? 'denied' : 'default'}
                      disabled={permission !== 'edit'}
                    >
                      <TextInputIcon>
                        <Crosshair />
                      </TextInputIcon>

                      <TextInputInput
                        value={title}
                        placeholder={object?.title}
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
                      placeholder={object?.description}
                      disabled={permission !== 'edit'}
                    />
                  </InputContainer>

                  {isUniqueRelational && (
                    <>
                      <InputContainer
                        as="label"
                        family="body"
                        className="radio"
                      >
                        <p>Eles acabam juntos?</p>
                        <InputRadio
                          values={[
                            { label: 'Sim', value: true },
                            { label: 'Não', value: false },
                          ]}
                          setState={setFinal}
                          state={final}
                          isInLine
                        />
                      </InputContainer>

                      <InputContainer as="label" family="body">
                        <p>Personagens</p>
                      </InputContainer>

                      <Avatares
                        listEmptyMessage="Você ainda não criou nenhum personagem que possa ser atribuído"
                        persons={personsThisProject}
                        internalButtonIcon={<Brandy />}
                        functionInternalButton={setPersonSelected}
                        personSelected={personSelected || object?.personId}
                        error={errorIn === 'avatar' && true}
                      />
                    </>
                  )}

                  {withSubObjects && (
                    <>
                      <InputContainer as="label" family="body">
                        <p>
                          {withSubObjects}
                          {permission === 'edit' && (
                            <ButtonRoot
                              type="button"
                              className="goBack"
                              wid="hug"
                              onClick={() => setShowSubObjectForm(true)}
                            >
                              <ButtonIcon>
                                <Plus weight="bold" />
                              </ButtonIcon>
                            </ButtonRoot>
                          )}
                        </p>
                      </InputContainer>
                      <SubObjects isEmpty={!subObjects[0]}>
                        {subObjects[0] ? (
                          subObjects.map((subObject) => (
                            <GenericCardObject
                              permission={permission}
                              key={subObject.description}
                              object={subObject}
                              to=""
                              icon={
                                permission === 'edit' ? (
                                  <X size={20} color="#fffddd" />
                                ) : (
                                  ' '
                                )
                              }
                              functionToButton={handleRemoveSubObject}
                            />
                          ))
                        ) : (
                          <ListEmpty
                            message={`Nenhuma ${withSubObjects} foi adicionada ainda`}
                          />
                        )}
                      </SubObjects>
                    </>
                  )}

                  {permission === 'edit' && (
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
                          router.push(
                            `/project/${projectId}/persons/${personId}`,
                          )
                        }
                      >
                        <ButtonIcon>
                          <FileX weight="bold" />
                        </ButtonIcon>

                        <ButtonLabel>Cancelar</ButtonLabel>
                      </ButtonRoot>
                    </div>
                  )}
                </FormContainer>
                {permission === 'edit' && !isNew && object && (
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

                {!isNew && onOpenDelete && object && (
                  <DeletePopUp>
                    <Box as="div">
                      <Text size="sm">
                        Tem certeza que quer apagar o {editorTo}:{' '}
                        {object?.title}? Será impossível desfazer isso.
                      </Text>
                      <ButtonRoot
                        type="button"
                        css={{
                          background: 'DarkRed',
                        }}
                        align="center"
                        onClick={() => handleDeleteObject()}
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
              </>
            )}
          </>
        )}
      </GenericEditorObjectContainer>
    </>
  )
}
