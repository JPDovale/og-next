import { IScene } from '@api/responsesTypes/capitule/ICapitule'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IPersonInObject } from '@api/responsesTypes/person/IPerson'
import { Avatares } from '@components/usefull/Avatares'
import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Checkbox } from '@components/usefull/Checkbox'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { TextInputInput } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { useCapitule } from '@hooks/useCapitule'
import { ISetSceneToComplete } from '@hooks/useCapitule/types/ISetSceneToComplete'
import { List, PencilLine, Trash, X } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
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
  capituleId,
  setOnEditScene,
}: ISceneCardProps) {
  const [checked, setChecked] = useState(false)
  const [deleteSelected, setDeleteSelected] = useState(false)
  const [reOrderSelected, setReOrderSelected] = useState(false)
  const [writtenWords, setWrittenWords] = useState('')
  const [toSequenceSet, setToSequenceSet] = useState('')
  const [errorIn, setErrorIn] = useState('')

  const { capitule, callEvent } = useCapitule(capituleId)

  async function handleSetCompleteScene() {
    setErrorIn('')

    try {
      writtenWordsInput.parse(writtenWords)
    } catch (err) {
      return setErrorIn('writtenWords')
    }

    const setCompleteScene: ISetSceneToComplete = {
      sceneId: scene.id,
      writtenWords: Number(writtenWords),
    }

    const { resolved } = await callEvent.setSceneToComplete(setCompleteScene)

    if (resolved) {
      setChecked(false)
    }
  }

  async function handleDeleteScene() {
    setErrorIn('')

    await callEvent.deleteScene(scene!.id)
  }

  async function handleReorderScenes() {
    setErrorIn('')

    try {
      writtenWordsInput.parse(toSequenceSet)
    } catch (err) {
      return setErrorIn('reorder')
    }

    const number = Number(toSequenceSet)

    if (capitule?.collections.scene.itensLength! < number) {
      return setErrorIn('reorder-max')
    }

    if (number <= 0) {
      return setErrorIn('reorder-min')
    }

    if (toSequenceSet === scene.infos.sequence.toString()) {
      setToSequenceSet('')
      setErrorIn('')
      return setReOrderSelected(false)
    }

    setErrorIn('')
    await callEvent.reorderScenes({
      sequenceFrom: scene.infos.sequence,
      sequenceTo: Number(toSequenceSet),
    })

    setReOrderSelected(false)
    setToSequenceSet('')
  }

  return (
    <SceneCardContainer data-testid="scene-card">
      <SceneHeading as="header">
        Cena: {scene.infos.sequence}
        <div className="buttons">
          {!checked && (
            <HeaderButton
              title="Editar cena"
              onClick={() => setOnEditScene(scene.id)}
              data-testid="edit-scene-button"
            >
              <PencilLine size={16} weight="duotone" />
            </HeaderButton>
          )}

          {!scene.infos.complete && (
            <Checkbox
              data-testid="check-complete"
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
                data-testid="reorder-scenes-button"
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
                data-testid="delete-scene-button"
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
        <AlternativeFormContainer data-testid="alternative-form">
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
              >
                <TextInputInput
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setWrittenWords(e.target.value)
                  }
                  value={writtenWords}
                />
              </WrittenWordsInput>
            </InputContainer>

            <ButtonRoot
              align="center"
              onClick={handleSetCompleteScene}
              disabled={!writtenWords}
            >
              <ButtonLabel>Marcar como concluído</ButtonLabel>
            </ButtonRoot>
          </div>
        </AlternativeFormContainer>
      )}

      {deleteSelected && (
        <AlternativeFormContainer data-testid="alternative-delete-form">
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

            <ButtonRoot
              align="center"
              onClick={handleDeleteScene}
              css={{ background: '$fullError' }}
            >
              <ButtonLabel>Excluir</ButtonLabel>
            </ButtonRoot>
          </div>
        </AlternativeFormContainer>
      )}

      {reOrderSelected && (
        <AlternativeFormContainer data-testid="alternative-reorder-form">
          <div className="form">
            <InputContainer title="">
              <Text family="body" size="sm">
                Reordenar cena de {scene.infos.sequence} ---&gt;{' '}
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
              >
                <TextInputInput
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setToSequenceSet(e.target.value)
                  }
                  placeholder={`Máximo: ${capitule?.collections.scene.itensLength}`}
                  value={toSequenceSet}
                />
              </WrittenWordsInput>
            </InputContainer>

            <ButtonRoot
              align="center"
              onClick={handleReorderScenes}
              disabled={!toSequenceSet}
            >
              <ButtonLabel>Reordenar cenas</ButtonLabel>
            </ButtonRoot>
          </div>
        </AlternativeFormContainer>
      )}

      {!checked && !deleteSelected && !reOrderSelected && (
        <>
          <SceneContent>
            {scene.infos.complete && (
              <InfoDefault title="Palavras escritas:">
                {scene.infos.writtenWords}
              </InfoDefault>
            )}

            <SceneCompleteAndObjective complete={scene.infos.complete}>
              <InfoDefault title="Objetivo da cena">
                {scene.infos.objective}
              </InfoDefault>

              <InfoDefault title="Completo">
                <span className="complete">
                  {scene.infos.complete ? 'Sim' : 'Não'}
                </span>
              </InfoDefault>
            </SceneCompleteAndObjective>

            <InfoDefault title="Personagens na cena:">
              <Avatares
                size="2xs"
                columns={10}
                listEmptyMessage="Nenhum personagem presente na cena"
                persons={persons as unknown as IPersonInObject[]}
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
