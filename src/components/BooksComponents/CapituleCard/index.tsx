import { ICapitulePreview } from '@api/responsesTypes/capitule/ICapitulePreview'
import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { TextInputInput } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { useBook } from '@hooks/useBook'
import { List, X } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { z } from 'zod'
import { HeaderButton } from '../SceneCard/styles'

import {
  AlternativeFormContainer,
  CapituleCardContainer,
  CapituleComplete,
  CapituleInfos,
  CapituleName,
  CapituleObjective,
  InputContainer,
  WrittenWordsInput,
} from './styles'

interface ICapituleCardProps {
  capitule: ICapitulePreview
  maxLengthToReorder: number
  bookId: string
  redirectFunction?: () => void
}

const writtenWordsInput = z.coerce.number({
  invalid_type_error: 'Coloque apenas números na idade do personagem.',
})

export function CapituleCard({
  capitule,
  maxLengthToReorder,
  bookId,
  redirectFunction,
}: ICapituleCardProps) {
  const [reOrderSelected, setReOrderSelected] = useState(false)
  const [toSequenceSet, setToSequenceSet] = useState('')
  const [errorIn, setErrorIn] = useState('')

  const { callEvent } = useBook(bookId)

  async function handleReorderCapitules() {
    setErrorIn('')

    try {
      writtenWordsInput.parse(toSequenceSet)
    } catch (err) {
      return setErrorIn('reorder')
    }

    const number = Number(toSequenceSet)

    if (maxLengthToReorder < number) {
      return setErrorIn('reorder-max')
    }

    if (number <= 0) {
      return setErrorIn('reorder-min')
    }

    if (toSequenceSet === capitule.infos.sequence.toString()) {
      setToSequenceSet('')
      setErrorIn('')
      return setReOrderSelected(false)
    }

    setErrorIn('')
    await callEvent.reorderCapitules({
      sequenceFrom: capitule.infos.sequence,
      sequenceTo: Number(toSequenceSet),
    })

    setReOrderSelected(false)
    setToSequenceSet('')
  }

  return (
    <CapituleCardContainer data-testid="capitule">
      <CapituleName as="div">
        <div>
          <Text as="span" weight="bold">
            {capitule.name}
          </Text>
          <Text size="sm" family="body" css={{ color: '$base800' }}>
            Clique para abrir a grade de cenas
          </Text>
        </div>

        <HeaderButton
          title="Reordenar capitulo"
          onClick={() => {
            setReOrderSelected(!reOrderSelected)
          }}
        >
          {reOrderSelected ? (
            <X size={16} weight="duotone" data-testid="cancel-reorder" />
          ) : (
            <List size={16} weight="duotone" data-testid="select-reorder" />
          )}
        </HeaderButton>
      </CapituleName>

      {!reOrderSelected && (
        <CapituleInfos
          data-testid="capitule-infos"
          type="button"
          onClick={redirectFunction && redirectFunction}
        >
          <ContainerGrid columns={4}>
            <InfoDefault title="Completo">
              <CapituleComplete
                as="div"
                size="sm"
                complete={capitule.infos.complete}
              >
                {capitule.infos.complete ? (
                  <Text
                    data-testid="complete"
                    family="body"
                    size="lg"
                    weight="bold"
                  >
                    Completo
                  </Text>
                ) : (
                  <Text
                    data-testid="incomplete"
                    family="body"
                    size="lg"
                    weight="bold"
                  >
                    Incompleto
                  </Text>
                )}
              </CapituleComplete>
            </InfoDefault>

            <InfoDefault title="Capítulo">
              {capitule.infos.sequence}
            </InfoDefault>

            <InfoDefault title="Cenas">
              {capitule?.collections.scene.itensLength}
            </InfoDefault>

            <InfoDefault title="Palavras">{capitule.infos.words}</InfoDefault>
          </ContainerGrid>

          <ContainerGrid>
            <InfoDefault title="Objetivo do capítulo">
              <CapituleObjective family="body">
                {capitule.infos.objective}
              </CapituleObjective>
            </InfoDefault>

            <Text size="xxs" css={{ marginBottom: '-$4' }}>
              Estrutura de 3 atos:
            </Text>

            <InfoDefault title="Ato 1">
              <CapituleObjective family="body">
                {capitule?.structure.act1 || 'Não definido'}
              </CapituleObjective>
            </InfoDefault>

            <InfoDefault title="Ato 2">
              <CapituleObjective family="body">
                {capitule?.structure.act2 || 'Não definido'}
              </CapituleObjective>
            </InfoDefault>

            <InfoDefault title="Ato 3">
              <CapituleObjective family="body">
                {capitule?.structure.act3 || 'Não definido'}
              </CapituleObjective>
            </InfoDefault>
          </ContainerGrid>
        </CapituleInfos>
      )}

      {reOrderSelected && (
        <AlternativeFormContainer data-testid="reorder-form">
          <div className="form">
            <InputContainer title="">
              <Text family="body" size="sm">
                Reordenar cena de {capitule.infos.sequence} ---&gt;{' '}
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
                  placeholder={`Máximo: ${maxLengthToReorder}`}
                  value={toSequenceSet}
                />
              </WrittenWordsInput>
            </InputContainer>

            <ButtonRoot
              align="center"
              onClick={handleReorderCapitules}
              disabled={!toSequenceSet}
            >
              <ButtonLabel>Reordenar capitulo</ButtonLabel>
            </ButtonRoot>
          </div>
        </AlternativeFormContainer>
      )}
    </CapituleCardContainer>
  )
}
