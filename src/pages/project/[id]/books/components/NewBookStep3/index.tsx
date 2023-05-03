import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { newBookFormData } from '../NewBookModal'

interface INewBookStep3Props {
  register: UseFormRegister<newBookFormData>
  errors: Partial<FieldErrorsImpl<newBookFormData>>
  isDarkMode: boolean
}

export function NewBookStep3({
  register,
  errors,
  isDarkMode,
}: INewBookStep3Props) {
  return (
    <ContainerGrid padding={0}>
      <Text size="sm" weight="bold">
        Termos técnicos
      </Text>

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
              {errors.literaryGenre?.message}
            </Text>
          </Text>

          <TextInputRoot
            css={{ background: !isDarkMode ? '$base600' : '' }}
            variant={!isDarkMode ? 'default' : 'noShadow'}
            size="sm"
          >
            <TextInputInput
              placeholder="Romance"
              {...register('literaryGenre')}
            />
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

          <TextInputRoot
            css={{ background: !isDarkMode ? '$base600' : '' }}
            variant={!isDarkMode ? 'default' : 'noShadow'}
            size="sm"
          >
            <TextInputInput
              placeholder="978-0-553-59168-4"
              {...register('isbn')}
            />
          </TextInputRoot>
        </Text>
      </ContainerGrid>
    </ContainerGrid>
  )
}
