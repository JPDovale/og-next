import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { newBookFormData } from '../NewBookModal'

interface INewBookStep3Props {
  register: UseFormRegister<newBookFormData>
  errors: Partial<FieldErrorsImpl<newBookFormData>>
}

export function NewBookStep3({ register, errors }: INewBookStep3Props) {
  return (
    <ContainerGrid padding={0}>
      <Text size="sm">Termos técnicos</Text>

      <ContainerGrid padding={0}>
        <Text as="label">
          <Text family="body" size="sm">
            Gênero literário do livro
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {errors.literaryGenere?.message}
            </Text>
          </Text>

          <TextInputRoot variant="noShadow" size="sm">
            <TextInputInput {...register('literaryGenere')} />
          </TextInputRoot>
        </Text>

        <Text as="label">
          <Text family="body" size="sm">
            ISBN do livro (Opcional)
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {errors.isbn?.message}
            </Text>
          </Text>

          <TextInputRoot variant="noShadow" size="sm">
            <TextInputInput {...register('isbn')} />
          </TextInputRoot>
        </Text>
      </ContainerGrid>
    </ContainerGrid>
  )
}
