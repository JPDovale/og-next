import { TextEditor } from '@components/TextEditor'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { Text } from '@components/usefull/Text'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { reverbKeys } from '@services/reverbKeys'
import { FileArrowUp, FileX, Textbox } from 'phosphor-react'
import { EditorHeader } from './styles'

interface IEditorProps {
  superFix?: string
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
  superFix,
}: IEditorProps) {
  const { GoBackButton } = usePreventBack(`/project/${projectId}/plot`)

  return (
    <ContainerGrid isRelativePosition>
      <GoBackButton topDistance={4} />

      <EditorHeader>
        <Text as="span" size="xl">
          <Textbox size={24} /> Editar {reverbKeys[to]} {superFix}.
        </Text>
      </EditorHeader>

      <TextEditor
        setValue={setValue}
        initialValue={preValue}
        permission={permission}
      />

      {permission === 'edit' && (
        <ContainerGrid columns={2}>
          <ButtonRoot
            type="button"
            align="center"
            css={{ background: 'DarkGreen' }}
            onClick={handleUpdate}
          >
            <ButtonIcon>
              <FileArrowUp weight="bold" />
            </ButtonIcon>
            <ButtonLabel>Salvar</ButtonLabel>
          </ButtonRoot>

          <ButtonRoot
            type="button"
            align="center"
            css={{ background: 'DarkRed' }}
            onClick={() => setValue && setValue(preValue || '')}
          >
            <ButtonIcon>
              <FileX weight="bold" />
            </ButtonIcon>
            <ButtonLabel>Cancelar</ButtonLabel>
          </ButtonRoot>
        </ContainerGrid>
      )}
    </ContainerGrid>
  )
}
