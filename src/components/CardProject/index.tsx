import { Button, IBoxProps, Text, TextInput } from '@og-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  BookBookmark,
  Envelope,
  Image as ImageIco,
  Share,
  XCircle,
} from 'phosphor-react'
import { FormEvent, useContext, useState } from 'react'
import { IProjectResponse } from '../../api/responsesTypes/IProjcetResponse'
import { ProjectsContext } from '../../contexts/projects'
import { UserContext } from '../../contexts/user'
import { AvatarWeb } from '../Avatar'
import { InputRadio } from '../InputRadio'
import { Loading } from '../Loading'
import {
  CardProjectContainer,
  HeaderShareForm,
  InfosContainer,
  Preview,
  ProjectInfos,
  ShareButton,
  ShareForm,
  SharePopUp,
  SharePopUpContainer,
  UserImage,
  UsersWhitAccess,
} from './styles'

type ICardProject = IBoxProps & {
  project: IProjectResponse
  isList?: boolean | 'example'
  isSharable?: boolean
}

export function CardProject({
  project,
  isList = false,
  isSharable = false,
  ...rest
}: ICardProject) {
  const { shareProject, users, loading, error, setError } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const [onShareProject, setOnShareProject] = useState('')
  const [sharePermission, setSharePermission] = useState('edit')
  const [shareEmail, setShareEmail] = useState('')
  const [errorIn, setErrorIn] = useState('')

  const router = useRouter()

  if (loading) return <Loading />

  const creatorOfProject = users.find(
    (user) => user.id === project.createdPerUser,
  )

  const usersWhitAccessIncludeUser = users.filter((user) => {
    const userAccess = !!project?.users?.find((u) => u.id === user.id)
    return userAccess
  })

  const usersWhitAccess = usersWhitAccessIncludeUser.filter(
    (u) => u.id !== user?.id,
  )

  const persons = project?.tags?.find((tag) => tag.type === 'persons')

  async function handleShareProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (error) setError(undefined)
    if (!shareEmail) {
      return setErrorIn('email')
    }

    const userInExisteProject = project.users.find(
      (user) => user.email === shareEmail,
    )

    if (userInExisteProject) {
      return setErrorIn('email')
    }

    const shareProjectWithUserInfos = {
      email: shareEmail,
      permission: sharePermission,
      projectId: project.id as string,
    }

    const shared = await shareProject(shareProjectWithUserInfos)
    if (shared) {
      setOnShareProject('')
    }
  }

  return (
    <>
      <CardProjectContainer isList={isList}>
        <Preview
          as={isList !== 'example' && 'button'}
          onClick={() => {
            router.replace(`/project/${project.id}`)
          }}
          {...rest}
        >
          {isList === false && (
            <div className="project-image">
              {project?.image ? (
                <Image
                  src={project?.image.url}
                  alt=""
                  width={300}
                  height={300}
                  priority
                />
              ) : (
                <ImageIco weight="thin" size={64} alt="" />
              )}
            </div>
          )}

          <ProjectInfos isList={isList}>
            <InfosContainer isList={isList}>
              <Text>
                {isList === true && <BookBookmark size={20} />}
                {isList === false && (
                  <Text as="span" family="body" size="sm" height="shorter">
                    Nome do projeto
                  </Text>
                )}
                {isList === 'example' ? 'NOME DO PROJETO' : project?.name}
              </Text>
              <Text as="p" height={'shorter'} size={'sm'}>
                {isList === false && (
                  <Text as="span" family="body" size="sm" height="shorter">
                    Data de criação
                  </Text>
                )}
                {isList === 'example' ? 'DATA DE CRIAÇÃO' : project.createAt}
              </Text>
            </InfosContainer>

            <InfosContainer columns={3} isList={isList}>
              <Text as="p" height={'shorter'} size={'sm'}>
                {isList === false && (
                  <Text as="span" family="body" size="sm" height="shorter">
                    Tipo do projeto
                  </Text>
                )}
                {isList === 'example' ? 'TIPO DO PROJETO' : project.type}
              </Text>
              <Text as="p" height={'shorter'} size={'sm'}>
                {isList === false && (
                  <Text as="span" family="body" size="sm" height="shorter">
                    Criado por
                  </Text>
                )}
                {isList === 'example'
                  ? 'CRIADO POR'
                  : creatorOfProject?.username
                  ? (creatorOfProject?.username as string)
                  : 'Você'}
              </Text>
              <Text as="p" height={'shorter'} size={'sm'}>
                {isList === false && (
                  <Text as="span" family="body" size="sm" height="shorter">
                    Usuários com acesso
                  </Text>
                )}
                {isList === 'example' ? 'Usuários' : project.users.length}
              </Text>
            </InfosContainer>

            {isList === false && (
              <InfosContainer>
                <Text as="p" height={'shorter'} size={'sm'}>
                  <Text as="span" family="body" size="sm" height="shorter">
                    Personagens
                  </Text>
                  {persons?.refs[0].references.length || 0}
                </Text>
              </InfosContainer>
            )}

            {isList === false && (
              <>
                <Text as="span" family="body" size="sm" height="shorter">
                  Usuários com acesso:
                </Text>

                <UsersWhitAccess>
                  <UserImage first>
                    <AvatarWeb
                      whitShadow
                      src={user?.avatar?.url as string}
                      size="xsm"
                    />
                  </UserImage>
                  {usersWhitAccess.map((u) => {
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
              </>
            )}
          </ProjectInfos>
        </Preview>
        {isList !== 'example' && isSharable && (
          <ShareButton
            disabled={project.users.length >= 5}
            isList={isList}
            icon={<Share />}
            wid="hug"
            onClick={() => {
              setError(undefined)
              setOnShareProject(`${project.id}`)
            }}
          />
        )}
      </CardProjectContainer>
      {onShareProject === project.id && (
        <SharePopUpContainer>
          <SharePopUp>
            <button
              type="button"
              className="close"
              onClick={() => setOnShareProject('')}
            >
              <XCircle size={32} />
            </button>
            <HeaderShareForm as="span">
              Pronto para compartilhar {project?.name}?
              <Text
                size="md"
                css={{
                  color: '$errorDefault',
                }}
                weight="bold"
                family="body"
              >
                {error?.message}
              </Text>
            </HeaderShareForm>
            <ShareForm onSubmit={handleShareProject}>
              <Text size="xs">
                Informe o email do usuário que quer compartilhar o projeto
              </Text>

              <TextInput
                icon={<Envelope />}
                placeholder="jonas@ognare.com"
                type="email"
                onChange={(e) => setShareEmail(e.target.value)}
                value={shareEmail}
                variant={errorIn === 'email' ? 'denied' : 'default'}
              />

              <Text size="xs">
                Esse usuário poderá{' '}
                {sharePermission === 'edit'
                  ? 'editar '
                  : sharePermission === 'comment'
                  ? 'comentar n'
                  : 'visualizar '}
                o projeto
              </Text>
              <InputRadio
                values={[
                  { label: 'Editor', value: 'edit' },
                  { label: 'Comentarista', value: 'comment' },
                  { label: 'Visualiza', value: 'view' },
                ]}
                setState={setSharePermission}
              />
              <Button
                type="submit"
                label="Compartilhar"
                icon={<Share />}
                wid="middle"
                align="center"
              />
            </ShareForm>
          </SharePopUp>
        </SharePopUpContainer>
      )}
    </>
  )
}
