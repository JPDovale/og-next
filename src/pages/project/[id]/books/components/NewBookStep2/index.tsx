import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { newBookFormData } from '../NewBookModal'

interface INewBookStep2Props {
  register: UseFormRegister<newBookFormData>
  errors: Partial<FieldErrorsImpl<newBookFormData>>
  isDarkMode: boolean
}

export function NewBookStep2({
  register,
  errors,
  isDarkMode,
}: INewBookStep2Props) {
  return (
    <ContainerGrid padding={0}>
      <Text size="sm" weight="bold">
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

          <TextInputRoot
            css={{ background: !isDarkMode ? '$base600' : '' }}
            variant={!isDarkMode ? 'default' : 'noShadow'}
            size="sm"
          >
            <TextInputInput placeholder="85000" {...register('words')} />
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

          <TextInputRoot
            css={{ background: !isDarkMode ? '$base600' : '' }}
            variant={!isDarkMode ? 'default' : 'noShadow'}
            size="sm"
          >
            <TextInputInput placeholder="269" {...register('writtenWords')} />
          </TextInputRoot>
        </Text>
      </ContainerGrid>
    </ContainerGrid>
  )
}
