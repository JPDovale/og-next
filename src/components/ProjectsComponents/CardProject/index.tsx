import * as Dialog from '@radix-ui/react-dialog'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon } from '@components/usefull/Button'

import { Text } from '@components/usefull/Text'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BookBookmark, Image as ImageIco, Share } from 'phosphor-react'
import { useState } from 'react'
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
import { useProjects } from '@hooks/useProjects'

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
  const [onShareProject, setOnShareProject] = useState('')

  const router = useRouter()

  const { findProject } = useProjects()
  const { usersInProject, projectName, projectImage, createdAt } = findProject(
    project.id,
  )

  return (
    <CardProjectContainer isList={isList}>
      <Preview
        title={projectName}
        as={isList !== 'example' ? 'button' : 'div'}
        onClick={() => {
          router.push(`/project/${project.id}`)
        }}
      >
        {isList === false && (
          <div className="project-image">
            {projectImage ? (
              <Image
                src={projectImage}
                alt={projectName}
                width={300}
                height={300}
                priority
              />
            ) : (
              <ImageIco weight="thin" size={64} alt={projectName} />
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
              {isList === 'example' ? 'NOME DO PROJETO' : projectName}
            </Text>
            <Text as="p" height={'shorter'} size={'sm'}>
              {isList === false && (
                <Text as="span" family="body" size="sm" height="shorter">
                  Data de criação
                </Text>
              )}
              {isList === 'example' ? 'DATA DE CRIAÇÃO' : createdAt}
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
                : project.user.username
                ? (project.user.username as string)
                : 'Você'}
            </Text>
            <Text as="p" height={'shorter'} size={'sm'}>
              {isList === false && (
                <Text as="span" family="body" size="sm" height="shorter">
                  Usuários com acesso
                </Text>
              )}
              {isList === 'example' ? 'Usuários' : usersInProject.length}
            </Text>
          </InfosContainer>

          {isList === false && (
            <InfosContainer columns={3}>
              <Text as="p" height={'shorter'} size={'sm'}>
                <Text as="span" family="body" size="sm" height="shorter">
                  Livros
                </Text>
                {project._count.books || 0}
              </Text>

              <Text as="p" height={'shorter'} size={'sm'}>
                <Text as="span" family="body" size="sm" height="shorter">
                  Personagens
                </Text>
                {project._count.persons || 0}
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
                    src={project.user?.avatar_url ?? undefined}
                    size="xsm"
                  />
                </UserImage>
                {usersInProject.map((u) => {
                  return (
                    <UserImage key={u.id}>
                      <AvatarWeb whitShadow src={u.avatarImage} size="xsm" />
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
              disabled={usersInProject.length >= 5}
              isList={isList}
              wid="hug"
              onClick={() => {
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
