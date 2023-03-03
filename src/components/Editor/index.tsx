import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { Textarea } from '@components/usefull/Textarea'
import { useRouter } from 'next/router'
import {
  CaretCircleDoubleLeft,
  FileArrowUp,
  FileX,
  Textbox,
} from 'phosphor-react'
import { useState } from 'react'
import { EditorContainer, EditorHeader } from './styles'
import { TextEditor } from '@components/TextEditor'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
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
        <div className="buttons">
          <ButtonRoot
            type="button"
            align="center"
            className="save"
            onClick={updateValue}
          >
            <ButtonIcon>
              <FileArrowUp weight="bold" />
            </ButtonIcon>
            <ButtonLabel>Salvar</ButtonLabel>
          </ButtonRoot>

          <ButtonRoot
            type="button"
            align="center"
            className="cancel"
            onClick={() => setValue && setValue(preValue || '')}
          >
            <ButtonIcon>
              <FileX weight="bold" />
            </ButtonIcon>
            <ButtonLabel>Cancelar</ButtonLabel>
          </ButtonRoot>
        </div>
      )}
      {error && (
        <Text
          size="md"
          css={{
            color: '$errorDefault',
          }}
          weight="bold"
          family="body"
        >
          {error}
        </Text>

      )}
    </ContainerGrid>
  )
}
