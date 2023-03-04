import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { newBookFormData } from '../NewBookModal'

interface INewBookStep1Props {
  register: UseFormRegister<newBookFormData>
  errors: Partial<FieldErrorsImpl<newBookFormData>>
}

export function NewBookStep1({ register, errors }: INewBookStep1Props) {
  return (
    <ContainerGrid padding={0}>
      <Text size="sm">Vamos começar definindo o nome do seu livro...</Text>

      <ContainerGrid padding={0}>
        <Text as="label">
          <Text family="body" size="sm">
            Título do livro
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {errors.title?.message}
            </Text>
          </Text>

          <TextInputRoot variant="noShadow" size="sm">
            <TextInputInput {...register('title')} />
          </TextInputRoot>
        </Text>

        <Text as="label">
          <Text family="body" size="sm">
            Subtítulo do livro (opcional)
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {errors.subtitle?.message}
            </Text>
          </Text>

          <TextInputRoot variant="noShadow" size="sm">
            <TextInputInput {...register('subtitle')} />
          </TextInputRoot>
        </Text>
      </ContainerGrid>
    </ContainerGrid>
  )
}
