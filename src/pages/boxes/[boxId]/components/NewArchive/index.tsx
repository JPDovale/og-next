import { Text } from '@components/usefull/Text'
import { FileImage } from 'phosphor-react'
import { ButtonHTMLAttributes, ComponentProps, forwardRef } from 'react'
import { NewArchiveContainer } from './styles'

interface INewArchiveProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ComponentProps<typeof NewArchiveContainer> {}

export const NewArchive = forwardRef<HTMLButtonElement, INewArchiveProps>(
  (props, ref) => {
    return (
      <NewArchiveContainer {...props} title="Novo arquivo" ref={ref}>
        <FileImage size={40} />

        <Text>Criar novo arquivo</Text>
      </NewArchiveContainer>
    )
  },
)

NewArchive.displayName = 'NewArchive'
