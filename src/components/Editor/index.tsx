import { TextEditor } from '@components/TextEditor'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { Button, Text } from '@og-ui/react'
import { reverbKeys } from '@services/reverbKeys'
import { FileArrowUp, FileX, Textbox } from 'phosphor-react'
import { EditorHeader } from './styles'

interface IEditorProps {
  projectId: string
  to: string
  preValue: string
  setValue: (newState: string) => void
  permission: 'edit' | 'comment' | 'view' | undefined
  handleUpdate: () => void
}

export function Editor({
  projectId,
  to,
  preValue,
  setValue,
  permission,
  handleUpdate,
}: IEditorProps) {
  const { GoBackButton } = usePreventBack(`/project/${projectId}/plot`)

  return (
    <ContainerGrid>
      <EditorHeader>
        <Text as="span" size="xl">
          <Textbox size={24} /> Editar {reverbKeys[to]}.
        </Text>
        <GoBackButton />
      </EditorHeader>

      <TextEditor
        setValue={setValue}
        initialValue={preValue}
        permission={permission}
      />

      {permission === 'edit' && (
        <ContainerGrid columns={2}>
          <Button
            type="button"
            align="center"
            label="Salvar"
            icon={<FileArrowUp weight="bold" />}
            onClick={handleUpdate}
            css={{ background: 'DarkGreen', padding: '$3' }}
          />
          <Button
            type="button"
            align="center"
            label="Cancelar"
            icon={<FileX weight="bold" />}
            onClick={() => setValue && setValue(preValue || '')}
            css={{ background: 'DarkRed', padding: '$3' }}
          />
        </ContainerGrid>
      )}
    </ContainerGrid>
  )
}
