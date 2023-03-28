import { Image } from 'phosphor-react'
import Dropzone from 'react-dropzone'
import { ContainerGrid } from '../ContainerGrid'
import { Text } from '../Text'
import { DropContainer } from './styles'

interface IUploadZoneProps {
  onUpload: (files: File[]) => void
}

interface IRenderMessageProps {
  isDragActive: boolean
  isDragReject: boolean
}

export function UploadZone({ onUpload }: IUploadZoneProps) {
  function renderMessage({ isDragActive, isDragReject }: IRenderMessageProps) {
    if (isDragReject) {
      return (
        <Text css={{ textAlign: 'center', color: '$errorDefault' }} size="sm">
          Arquivos não suportados
        </Text>
      )
    }

    if (isDragActive) {
      return (
        <Text css={{ textAlign: 'center', color: '$successDefault' }} size="sm">
          Solte seus arquivos aqui
        </Text>
      )
    }

    return (
      <Text css={{ textAlign: 'center' }} size="sm">
        Arraste ou selecione suas imagens
      </Text>
    )
  }

  return (
    <Dropzone
      accept={{ image: ['image/jpg', 'image/png', 'image/jpeg'] }}
      onDropAccepted={onUpload}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input
            {...getInputProps()}
            id="files"
            type="file"
            name="files"
            title="files"
          />

          <ContainerGrid padding={0}>
            <ContainerGrid
              padding={0}
              css={{ display: 'flex', justifyContent: 'center' }}
            >
              <Image alt="ícone" size={28} />
            </ContainerGrid>

            {renderMessage({ isDragActive, isDragReject })}
          </ContainerGrid>
        </DropContainer>
      )}
    </Dropzone>
  )
}
