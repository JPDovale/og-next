import { Button, Text } from '@og-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  CaretCircleDoubleLeft,
  Image as ImageIco,
  Pencil,
  Trash,
} from 'phosphor-react'
import { useState } from 'react'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { AvatarWeb } from '../../Avatar'
import { Loading } from '../../Loading'
import { ContainerGrid } from '../ContainerGrid'
import { InfoDefault } from '../InfoDefault'
import { ProgressBar } from '../ProgressBar'
import {
  EditImgForm,
  HeaderImageAndInfosContainer,
  InfosContainer,
  Input,
  UserImage,
  UsersWhitAccess,
} from './styles'

interface IInfos {
  infos: Array<{
    label: string
    value: string
  }>
  columns: 1 | 2 | 3 | 4
}

interface IHeaderImageAndInfosProps {
  url: string | undefined
  permission: 'view' | 'edit' | 'comment' | undefined
  idObject: string
  pathGoBack: string
  typeImage?: 'vertical' | 'horizontal' | 'square'
  allInfos: IInfos[] | undefined
  withProgressBar?: boolean
  withAvatares?: boolean
  avatares?: IUserResponse[]
  creator: IUserResponse
  initialValeu?: number
  finalValue?: number

  onUpdateCalled: (files: FileList | null) => Promise<void>
  onRemoveCalled: (id: string) => Promise<void>
}

export function HeaderImageAndInfos({
  permission,
  url,
  idObject,
  pathGoBack,
  typeImage = 'square',
  allInfos = [],
  withProgressBar = false,
  withAvatares = false,
  avatares = [],
  creator,
  initialValeu = 0,
  finalValue = 0,

  onUpdateCalled,
  onRemoveCalled,
}: IHeaderImageAndInfosProps) {
  const [onUpdateImage, setOnUpdateImage] = useState(false)
  const [onEditImg, setOnEditImg] = useState(false)

  const router = useRouter()

  async function onUpdate(files: FileList | null) {
    if (!files) return
    setOnUpdateImage(true)
    await onUpdateCalled(files)

    setOnUpdateImage(false)
    setOnEditImg(false)
  }

  async function onRemove() {
    setOnUpdateImage(true)
    await onRemoveCalled(idObject)
    setOnEditImg(false)
    setOnUpdateImage(false)
  }

  return (
    <HeaderImageAndInfosContainer typeImage={typeImage}>
      {onUpdateImage ? (
        <div className="image">
          <Loading />
        </div>
      ) : !url ? (
        <ImageIco
          className="image"
          weight="thin"
          size={60}
          alt=""
          onClick={() => setOnEditImg(!onEditImg)}
        />
      ) : (
        <Image
          className="image"
          src={url}
          alt=""
          onClick={() => setOnEditImg(!onEditImg)}
          height={800}
          width={800}
          priority
        />
      )}

      {permission === 'edit' && (
        <EditImgForm
          visible={onEditImg}
          encType="multipart/form-data"
          typeImage={typeImage}
        >
          <Input htmlFor="file">
            <Pencil />
            EDITAR
            <input
              type="file"
              id="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                onUpdate(e.target.files)
              }}
            />
          </Input>
          {url && (
            <Button
              type="button"
              icon={<Trash />}
              wid="middle"
              align="center"
              label="REMOVER"
              onClick={onRemove}
            />
          )}
        </EditImgForm>
      )}

      <InfosContainer typeImage={typeImage}>
        <Button
          type="button"
          className="goBack"
          wid="hug"
          icon={<CaretCircleDoubleLeft weight="bold" />}
          onClick={() => router.push(pathGoBack)}
        />

        {allInfos.map((infos) => (
          <ContainerGrid key={JSON.stringify(infos)} columns={infos.columns}>
            {infos.infos.map((info) => (
              <InfoDefault key={JSON.stringify(info)} title={info.label + ':'}>
                <Text as="p" size="sm">
                  {info.value}
                </Text>
              </InfoDefault>
            ))}
          </ContainerGrid>
        ))}

        {withProgressBar && (
          <ContainerGrid>
            <InfoDefault
              title={`${initialValeu} palavras escritas de ${finalValue} palavras`}
            >
              <ProgressBar actual={initialValeu} final={finalValue} />
            </InfoDefault>
          </ContainerGrid>
        )}

        {withAvatares && (
          <ContainerGrid>
            <InfoDefault title="Autores">
              <UsersWhitAccess>
                <UserImage first>
                  <AvatarWeb
                    whitShadow
                    src={creator?.avatar?.url as string}
                    size="xsm"
                  />
                </UserImage>
                {avatares.map((u) => {
                  return (
                    <UserImage key={u.id}>
                      <AvatarWeb
                        whitShadow
                        src={u.avatar?.url as string}
                        size="xsm"
                      />
                    </UserImage>
                  )
                })}
              </UsersWhitAccess>
            </InfoDefault>
          </ContainerGrid>
        )}
      </InfosContainer>
    </HeaderImageAndInfosContainer>
  )
}
