import { Button, Text, Textarea } from '@og-ui/react'
import { useRouter } from 'next/router'
import {
  CaretCircleDoubleLeft,
  FileArrowUp,
  FileX,
  Textbox,
} from 'phosphor-react'
import { useState } from 'react'
import { EditorContainer, EditorHeader } from './styles'

interface IEditorProps {
  value: any
  preValue?: string
  setValue?: (newState: any) => void
  permission?: 'edit' | 'view' | 'comment' | undefined
  updateValue: () => void
  to: string
  message?: string
  toMany?: any[]
  preValueToMany?: string[]
}

export function EditorPased({
  setValue,
  value,
  preValue,
  permission,
  updateValue,
  to,
  toMany,
  preValueToMany,
  message,
}: IEditorProps) {
  const [valueChanged, setValueChanged] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const { id: projectId } = router.query
  const goBackPath = router.pathname.split('/')[3]

  return (
    <EditorContainer toMany={!!toMany}>
      <EditorHeader>
        <Text as="span">
          <Textbox size={24} /> Editar {to}.
        </Text>
        <Button
          type="button"
          className="goBack"
          wid="hug"
          icon={<CaretCircleDoubleLeft weight="bold" />}
          onClick={() => router.push(`/project/${projectId}/${goBackPath}`)}
        />
      </EditorHeader>
      <Text
        size="md"
        css={{
          color: '$successDefault',
        }}
        weight="bold"
        family="body"
      >
        {message}
      </Text>
      {toMany ? (
        <>
          {toMany.map((i, index) => {
            const valueThisIndex = value.find((item: any) => item.key === i.key)
            const valueThisIndexChanged = valueThisIndex.changed

            return (
              <Textarea
                key={i.key}
                placeholder={`Digite aqui o(a) ${i.label}`}
                value={
                  valueThisIndex.value ||
                  (!valueThisIndexChanged
                    ? preValueToMany && preValueToMany[index]
                    : valueThisIndex.value)
                }
                onClick={() =>
                  permission !== 'edit' &&
                  setError(
                    'Você não tem permissão para editar o projeto. Aguarde os editores.',
                  )
                }
                onChange={(e) => {
                  const thisIndexUpdated = valueThisIndex

                  if (!valueThisIndexChanged) {
                    thisIndexUpdated.changed = true
                  }

                  const filteredKeys = value.filter(
                    (item: any) => item.key !== i.key,
                  )

                  thisIndexUpdated.value = e.target.value

                  const newState = [...filteredKeys, thisIndexUpdated]
                  setValue && setValue(newState)
                }}
                readOnly={permission !== 'edit'}
              />
            )
          })}
        </>
      ) : (
        <Textarea
          placeholder={`Digite aqui o(a) ${to}`}
          value={value || (!valueChanged ? preValue : value)}
          onClick={() =>
            permission !== 'edit' &&
            setError(
              'Você não tem permissão para editar o projeto. Aguarde os editores.',
            )
          }
          onChange={(e) => {
            if (!valueChanged) {
              setValueChanged(true)
            }
            setValue && setValue(e.target.value)
          }}
          readOnly={permission !== 'edit'}
        />
      )}

      {permission === 'edit' && (
        <div className="buttons">
          <Button
            type="button"
            align="center"
            className="save"
            label="Salvar"
            icon={<FileArrowUp weight="bold" />}
            onClick={updateValue}
          />
          <Button
            type="button"
            align="center"
            className="cancel"
            label="Cancelar"
            icon={<FileX weight="bold" />}
            onClick={() => setValue && setValue(preValue || '')}
          />
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
    </EditorContainer>
  )
}
