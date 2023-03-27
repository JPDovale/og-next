import { ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Text } from '@components/usefull/Text'
import { X } from 'phosphor-react'
import { useState } from 'react'
import {
  FieldErrorsImpl,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import { newBookFormData } from '../NewBookModal'
import { GenereCard } from '../NewBookModal/styles'

interface IGenere {
  name: string
}

interface INewBookStep4Props {
  errors: Partial<FieldErrorsImpl<newBookFormData>>
  generes: IGenere[]
  setError: UseFormSetError<newBookFormData>
  setValue: UseFormSetValue<newBookFormData>
}

export function NewBookStep4({
  errors,
  generes,
  setError,
  setValue,
}: INewBookStep4Props) {
  const [genere, setGenere] = useState('')

  function handleAddGenere() {
    const generesNow = generes || []
    const genereToAdd = genere.toLowerCase()

    if (generesNow.length >= 6) {
      return setError('generes', {
        message:
          'Não é aconselhável que um livro tenha muitos gêneros, por esse motivo, limitamos o número de gêneros para 6',
      })
    }

    const genereExiste = generesNow.find(
      (g) => g.name.toLowerCase() === genereToAdd,
    )

    if (genereExiste) {
      return setError('generes', {
        message: 'Você já adicionou esse gênero. Tente outro',
      })
    }

    setValue('generes', [{ name: genere }, ...generesNow])
    setError('generes', { message: '' })
    setGenere('')
  }

  function handleRemoveGenere(genere: string) {
    const filteredGeneres = generes.filter((g) => g.name !== genere)

    setValue('generes', filteredGeneres)
  }

  return (
    <ContainerGrid padding={0}>
      <Text size="sm">Vamos para os subgêneros literários</Text>

      <ContainerGrid padding={0}>
        <Text as="label">
          <Text family="body" size="sm">
            Adicionar subgênero ao livro:
            <Text
              as="span"
              family="body"
              size="xs"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {errors.generes?.message}
            </Text>
          </Text>

          <TextInputRoot variant="noShadow" size="sm">
            <TextInputInput
              name="genere"
              value={genere}
              onChange={(e) => setGenere(e.target.value)}
            />
          </TextInputRoot>

          <ButtonRoot
            type="button"
            size="xs"
            wid="full"
            align="center"
            variant="noShadow"
            disabled={!genere}
            css={{ marginTop: '$4' }}
            onClick={handleAddGenere}
          >
            <ButtonLabel>Adicionar</ButtonLabel>
          </ButtonRoot>
        </Text>

        <Text as="div" css={{ paddingBottom: '$4' }}>
          <Text family="body" size="sm">
            Subgêneros do livro:
          </Text>

          <ContainerGrid padding={0} columns={generes && generes[0] ? 4 : 1}>
            {generes && generes[0] ? (
              <>
                {generes.map((g) => (
                  <GenereCard key={g.name}>
                    <Text>{g.name}</Text>

                    <button
                      type="button"
                      title="remover gênero"
                      onClick={() => handleRemoveGenere(g.name)}
                    >
                      <X weight="bold" size={18} />
                    </button>
                  </GenereCard>
                ))}
              </>
            ) : (
              <ListEmpty
                message="Nenhum gênero foi adicionado ainda"
                isInLine
              />
            )}
          </ContainerGrid>
        </Text>
      </ContainerGrid>
    </ContainerGrid>
  )
}
