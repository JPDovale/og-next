import { useEffect, FormEvent, useContext, useState } from 'react'
import { Box, Button, Text, Textarea, TextInput } from '@og-ui/react'
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
import { IPersonsResponse } from '../../api/responsesTypes/IPersonsResponse'
import { IRef } from '../../api/responsesTypes/IProjcetResponse'
import { findRefs } from '../../services/findRefs'
import { GenericCardObject } from '../GenericCardObject'
import { Refs } from '../Refs'
import {
  DeletePopUp,
  EditorHeader,
  FormContainer,
  GenericEditorObjectContainer,
  InputContainer,
  SubObjectForm,
  SubObjectFormContainer,
  SubObjects,
} from './styles'
import { ListEmpty } from '../ListEmpty'
import { IEditorTo } from '../../@types/editores/IEditorTo'
import { InputRadio } from '../InputRadio'
import { Avatares } from '../Avatares'
import { ProjectsContext } from '../../contexts/projects'
import { useRouter } from 'next/router'

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
  refs: IRef[]
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
  refs,
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

  const filteredRefs = findRefs(editorTo, refs, person)

  function handleSelectRef(ref: IRef) {
    setRefSelected(ref.object.id as string)
    setTitle(ref.object.title as string)
    setDescription(ref.object.description as string)
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (refSelected) {
      const ref = refs.find((ref) => ref.object.id === refSelected) as IRef

      const savedRef = await saveRefObjectGeneric(
        personId,
        projectId,
        ref.object.id as string,
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
                      <Button
                        type="button"
                        className="goBack"
                        wid="hug"
                        icon={<CaretCircleDoubleLeft weight="bold" />}
                        onClick={() => setShowSubObjectForm(false)}
                      />
                    </EditorHeader>
                    <InputContainer as="label" family="body">
                      <p>Titulo da {withSubObjects}</p>
                      <TextInput
                        variant={
                          errorIn === 'titleSubObject' ? 'denied' : 'default'
                        }
                        value={titleSubObject}
                        icon={<Crosshair />}
                        onChange={(e) =>
                          permission === 'edit' &&
                          setTitleSubObject(e.target.value)
                        }
                        disabled={permission !== 'edit'}
                      />
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
                      <Button
                        type="button"
                        align="center"
                        className="save"
                        label="Salvar"
                        icon={<FileArrowUp weight="bold" />}
                        onClick={handleSaveNewSubObject}
                      />
                      <Button
                        type="button"
                        align="center"
                        className="cancel"
                        label="Cancelar"
                        icon={<FileX weight="bold" />}
                        onClick={() => {
                          setShowSubObjectForm(false)
                          setTitleSubObject('')
                          setDescriptionSubObject('')
                        }}
                      />
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
                  title={`Reaproveite ${editorTo}s já criados`}
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
                  <p>Titulo do {editorTo}</p>
                  <TextInput
                    variant={errorIn === 'title' ? 'denied' : 'default'}
                    value={title}
                    icon={<Crosshair />}
                    placeholder={object?.title}
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
                    placeholder={object?.description}
                    disabled={permission !== 'edit'}
                  />
                </InputContainer>

                {isUniqueRelational && (
                  <>
                    <InputContainer as="label" family="body" className="radio">
                      <p>Eles acabam juntos?</p>
                      <InputRadio
                        values={[
                          { label: 'Sim', value: true },
                          { label: 'Não', value: false },
                        ]}
                        setState={setFinal}
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
                          <Button
                            type="button"
                            className="goBack"
                            wid="hug"
                            icon={<Plus weight="bold" />}
                            onClick={() => setShowSubObjectForm(true)}
                          />
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
                )}
              </FormContainer>
              {permission === 'edit' && !isNew && object && (
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

              {!isNew && onOpenDelete && object && (
                <DeletePopUp>
                  <Box as="div">
                    <Text size="sm">
                      Tem certeza que quer apagar o {editorTo}: {object?.title}?
                      Será impossível desfazer isso.
                    </Text>
                    <Button
                      type="button"
                      css={{
                        background: 'DarkRed',
                      }}
                      align="center"
                      icon={<Trash weight="bold" />}
                      label="Apagar permanentemente"
                      onClick={() => handleDeleteObject()}
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
            </>
          )}
        </>
      )}
    </GenericEditorObjectContainer>
  )
}
