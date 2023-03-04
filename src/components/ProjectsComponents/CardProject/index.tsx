import * as Dialog from '@radix-ui/react-dialog'
import { IProjectResponse } from '@api/responsesTypes/IProjcetResponse'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon } from '@components/usefull/Button'

import { Text } from '@components/usefull/Text'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BookBookmark, Image as ImageIco, Share } from 'phosphor-react'
import { useContext, useState } from 'react'
import { ShareProjectButton } from './components/ShareProjectButton'
import {
  CardProjectContainer,
  InfosContainer,
  Preview,
  ProjectInfos,
  UserImage,
  UsersWhitAccess,
} from './styles'
import { ShareProjectModal } from './components/ShareProjectModal'

interface ICardProjectProps {
  project: IProjectResponse
  isList?: boolean | 'example'
  isSharable?: boolean
}

export function CardProject({
  project,
  isList = false,
  isSharable = false,
}: ICardProjectProps) {
  const { users, setError } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const [onShareProject, setOnShareProject] = useState('')

  const router = useRouter()

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
  const books = project?.tags?.find((tag) => tag.type === 'books')

  return (
    <CardProjectContainer isList={isList}>
      <Preview
        title={project?.name}
        as={isList !== 'example' ? 'button' : 'div'}
        onClick={() => {
          router.push(`/project/${project.id}`)
        }}
      >
        {isList === false && (
          <div className="project-image">
            {project?.image?.url ? (
              <Image
                src={project?.image.url}
                alt={project?.name}
                width={300}
                height={300}
                priority
              />
            ) : (
              <ImageIco weight="thin" size={64} alt={project?.name} />
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
            <InfosContainer columns={3}>
              <Text as="p" height={'shorter'} size={'sm'}>
                <Text as="span" family="body" size="sm" height="shorter">
                  Livros
                </Text>
                {books?.refs[0].references.length || 0}
              </Text>

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
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ShareProjectButton
              title="Compartilhar projeto"
              disabled={project.users.length >= 5}
              isList={isList}
              wid="hug"
              onClick={() => {
                setError(undefined)
                setOnShareProject(`${project.id}`)
              }}
            >
              <ButtonIcon>
                <Share />
              </ButtonIcon>
            </ShareProjectButton>
          </Dialog.Trigger>

          <ShareProjectModal projectId={onShareProject} />
        </Dialog.Root>
      )}
    </CardProjectContainer>
  )
}
