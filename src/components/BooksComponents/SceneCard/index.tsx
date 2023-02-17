import { ISetSceneToCompleteRequest } from '@api/booksRequests/types/ISetSceneToCompleteRequest'
import { IScene } from '@api/responsesTypes/IBooksResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { Avatares } from '@components/usefull/Avatares'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { ProjectsContext } from '@contexts/projects'
import { useProject } from '@hooks/useProject'
import { Button, Checkbox, Text } from '@og-ui/react'
import { useRouter } from 'next/router'
import { List, PencilLine, Trash, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { z } from 'zod'

import {
  AlternativeFormContainer,
  HeaderButton,
  InputContainer,
  SceneCardContainer,
  SceneCompleteAndObjective,
  SceneContent,
  SceneHeading,
  WrittenWordsInput,
} from './styles'

interface ISceneCardProps {
  bookId: string
  capituleId: string
  scene: IScene
  persons: IPersonsResponse[]
  setOnEditScene: (newState: string) => void
}

const writtenWordsInput = z.string().regex(/^([0-9]+)$/, {
  message: 'Coloque apenas números na idade do personagem.',
})

export function SceneCard({
  scene,
  persons,
  bookId,
  capituleId,
  setOnEditScene,
}: ISceneCardProps) {
  const [checked, setChecked] = useState(false)
  const [deleteSelected, setDeleteSelected] = useState(false)
  const [reOrderSelected, setReOrderSelected] = useState(false)
  const [writtenWords, setWrittenWords] = useState('')
  const [toSequenceSet, setToSequenceSet] = useState('')
  const [errorIn, setErrorIn] = useState('')

  const router = useRouter()
  const { id } = router.query

  const { setSceneToComplete, deleteScene, reorderScenes } =
    useContext(ProjectsContext)

  const { useBook } = useProject(id as string)
  const { findCapitule } = useBook(bookId)
  const { capitule } = findCapitule(capituleId)

  async function handleSetCompleteScene() {
    setErrorIn('')

    try {
      writtenWordsInput.parse(writtenWords)
    } catch (err) {
      return setErrorIn('writtenWords')
    }

    const setCompleteScene: ISetSceneToCompleteRequest = {
      bookId,
      capituleId,
      sceneId: scene.id,
      writtenWords,
    }

    const isSet = await setSceneToComplete(setCompleteScene)

    if (isSet) {
      setChecked(false)
    }
  }

  async function handleDeleteScene() {
    setErrorIn('')

    await deleteScene({ bookId, capituleId, sceneId: scene.id })
  }

  async function handleReorderScenes() {
    setErrorIn('')

    try {
      writtenWordsInput.parse(toSequenceSet)
    } catch (err) {
      return setErrorIn('reorder')
    }

    const number = Number(toSequenceSet)

    if (capitule?.scenes?.length! < number) {
      return setErrorIn('reorder-max')
    }

    if (number <= 0) {
      return setErrorIn('reorder-min')
    }

    if (toSequenceSet === scene.sequence) {
      setToSequenceSet('')
      setErrorIn('')
      return setReOrderSelected(false)
    }

    setErrorIn('')
    await reorderScenes({
      bookId,
      capituleId,
      sequenceFrom: scene.sequence,
      sequenceTo: toSequenceSet,
    })

    setReOrderSelected(false)
    setToSequenceSet('')
  }

  return (
    <SceneCardContainer>
      <SceneHeading as="header">
        Cena: {scene.sequence}
        <div className="buttons">
          {!checked && (
            <HeaderButton title="Editar cena">
              <PencilLine
                size={16}
                weight="duotone"
                onClick={() => setOnEditScene(scene.id)}
              />
            </HeaderButton>
          )}

          {!scene.complete && (
            <Checkbox
              onCheckedChange={() => {
                setChecked(!checked)
                setDeleteSelected(false)
                setReOrderSelected(false)
              }}
              title="Marcar cena como concluída"
            />
          )}

          {!checked && (
            <>
              <HeaderButton
                title="Reordenar cenas"
                onClick={() => {
                  setReOrderSelected(!reOrderSelected)
                  setDeleteSelected(false)
                }}
              >
                {reOrderSelected ? (
                  <X size={16} weight="duotone" />
                ) : (
                  <List size={16} weight="duotone" />
                )}
              </HeaderButton>

              <HeaderButton
                toDelete={!deleteSelected}
                title={deleteSelected ? 'Cancelar' : 'Remover cena'}
                onClick={() => {
                  setDeleteSelected(!deleteSelected)
                  setReOrderSelected(false)
                }}
              >
                {deleteSelected ? (
                  <X size={16} weight="duotone" />
                ) : (
                  <Trash size={16} weight="bold" />
                )}
              </HeaderButton>
            </>
          )}
        </div>
      </SceneHeading>

      {checked && (
        <AlternativeFormContainer>
          <div className="form">
            <InputContainer title="">
              <Text family="body" size="sm">
                Numero de palavras escritas
                <Text as="span" family="body" size="sm">
                  {errorIn === 'writtenWords' && 'Coloque apenas números'}
                </Text>
              </Text>

              <WrittenWordsInput
                variant={errorIn === 'writtenWords' ? 'denied' : 'default'}
                onChange={(e) => setWrittenWords(e.target.value)}
                value={writtenWords}
              />
            </InputContainer>

            <Button
              align="center"
              label="Marcar como concluído"
              onClick={handleSetCompleteScene}
              disabled={!writtenWords}
            />
          </div>
        </AlternativeFormContainer>
      )}

      {deleteSelected && (
        <AlternativeFormContainer>
          <div className="form">
            <InputContainer>
              <Text family="body" size="sm">
                Tem certeza que quer excluir essa cena? Não será possível
                desafazer isso depois
                <Text as="span" family="body" size="sm">
                  {errorIn === 'writtenWords' && 'Coloque apenas números'}
                </Text>
              </Text>
            </InputContainer>

            <Button
              align="center"
              label="Excluir"
              onClick={handleDeleteScene}
              css={{ background: '$fullError' }}
            />
          </div>
        </AlternativeFormContainer>
      )}

      {reOrderSelected && (
        <AlternativeFormContainer>
          <div className="form">
            <InputContainer title="">
              <Text family="body" size="sm">
                Reordenar cena de {scene.sequence} ---&gt;{' '}
                {toSequenceSet && toSequenceSet}
                <Text as="span" family="body" size="sm">
                  {errorIn === 'reorder'
                    ? 'Coloque apenas números'
                    : errorIn === 'reorder-max'
                    ? 'Valor máximo ultrapassado'
                    : errorIn === 'reorder-min'
                    ? 'O mínimo é de 1'
                    : ''}
                </Text>
              </Text>

              <WrittenWordsInput
                variant={errorIn === 'reorder' ? 'denied' : 'default'}
                onChange={(e) => setToSequenceSet(e.target.value)}
                placeholder={`Máximo: ${capitule?.scenes?.length}`}
                value={toSequenceSet}
              />
            </InputContainer>

            <Button
              align="center"
              label="Reordenar cenas"
              onClick={handleReorderScenes}
              disabled={!toSequenceSet}
            />
          </div>
        </AlternativeFormContainer>
      )}

      {!checked && !deleteSelected && !reOrderSelected && (
        <>
          <SceneContent>
            {scene.complete && (
              <InfoDefault title="Palavras escritas:">
                {scene.writtenWords}
              </InfoDefault>
            )}

            <SceneCompleteAndObjective complete={scene.complete}>
              <InfoDefault title="Objetivo da cena">
                {scene.objective}
              </InfoDefault>

              <InfoDefault title="Completo">
                <span className="complete">
                  {scene.complete ? 'Sim' : 'Não'}
                </span>
              </InfoDefault>
            </SceneCompleteAndObjective>

            <InfoDefault title="Personagens na cena:">
              <Avatares
                size="2xs"
                columns={10}
                listEmptyMessage="Nenhum personagem presente na cena"
                persons={persons}
              />
            </InfoDefault>

            <InfoDefault title="Estrutura - Ato 1:">
              {scene.structure.act1}
            </InfoDefault>

            <InfoDefault title="Estrutura - Ato 2:">
              {scene.structure.act2}
            </InfoDefault>

            <InfoDefault title="Estrutura - Ato 3:">
              {scene.structure.act3}
            </InfoDefault>
          </SceneContent>
        </>
      )}
    </SceneCardContainer>
  )
}
