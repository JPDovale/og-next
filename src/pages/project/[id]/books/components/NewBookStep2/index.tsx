import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { newBookFormData } from '../NewBookModal'

interface INewBookStep2Props {
  register: UseFormRegister<newBookFormData>
  errors: Partial<FieldErrorsImpl<newBookFormData>>
}

export function NewBookStep2({ register, errors }: INewBookStep2Props) {
  return (
    <ContainerGrid padding={0}>
      <Text size="sm">
        Agora vamos definir tudo relacionado a quantidade de palavras do seu
        livro
      </Text>

      <ContainerGrid padding={0}>
        <Text as="label">
          <Text family="body" size="sm">
            Estimativa de palavras para esse livro
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {errors.words?.message}
            </Text>
          </Text>

          <TextInputRoot variant="noShadow" size="sm">
            <TextInputInput {...register('words')} />
          </TextInputRoot>
        </Text>

        <Text as="label">
          <Text family="body" size="sm">
            Palavras já escritas
            <Text
              as="span"
              family="body"
              size="sm"
              css={{ color: '$errorDefault', float: 'right' }}
            >
              {errors.writtenWords?.message}
            </Text>
          </Text>

          <TextInputRoot variant="noShadow" size="sm">
            <TextInputInput {...register('writtenWords')} />
          </TextInputRoot>
        </Text>
      </ContainerGrid>
    </ContainerGrid>
  )
}
