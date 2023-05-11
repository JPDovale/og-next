import { Text } from '@components/usefull/Text'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  CaretCircleDoubleLeft,
  Image as ImageIco,
  Pencil,
  Trash,
} from 'phosphor-react'
import { useState } from 'react'
import { AvatarWeb } from '../Avatar'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '../Button'
import { ContainerGrid } from '../ContainerGrid'
import { InfoDefault } from '../InfoDefault'
import { Loading } from '../Loading'
import { ProgressBar } from '../ProgressBar'

import {
  EditImgForm,
  HeaderImageAndInfosContainer,
  InfosContainer,
  Input,
  UserImage,
  UsersWhitAccess,
} from './styles'
import { IAuthor } from '@api/responsesTypes/IBooksResponse'

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
  avatares?: IAuthor[]
  initialValeu?: number
  finalValue?: number

  onUpdateCalled: (files: FileList | null) => Promise<void>
  onRemoveCalled: (id: string) => Promise<boolean>
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
            <ButtonRoot
              type="button"
              wid="middle"
              align="center"
              onClick={onRemove}
            >
              <ButtonIcon>
                <Trash />
              </ButtonIcon>

              <ButtonLabel>REMOVER</ButtonLabel>
            </ButtonRoot>
          )}
        </EditImgForm>
      )}

      <InfosContainer typeImage={typeImage}>
        <ButtonRoot
          type="button"
          className="goBack"
          wid="hug"
          onClick={() => router.push(pathGoBack)}
        >
          <ButtonIcon>
            <CaretCircleDoubleLeft weight="bold" />
          </ButtonIcon>
        </ButtonRoot>

        {allInfos.map((infos) => (
          <ContainerGrid key={JSON.stringify(infos)} columns={infos.columns}>
            {infos.infos.map((info) => (
              <>
                {info.label && info.value && (
                  <InfoDefault key={JSON.stringify(info)} title={info.label}>
                    <Text
                      as="p"
                      size="xl"
                      height="shorter"
                      weight="bold"
                      family="body"
                    >
                      {info.value}
                    </Text>
                  </InfoDefault>
                )}
              </>
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
                {avatares.map((u, i) => {
                  return (
                    <UserImage key={u.id} first={i === 0}>
                      <AvatarWeb
                        whitShadow
                        src={u?.user.avatar_url ?? undefined}
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
