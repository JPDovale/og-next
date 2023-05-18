import * as Dialog from '@radix-ui/react-dialog'
import { AvatarWeb } from '@components/usefull/Avatar'
import { ButtonIcon } from '@components/usefull/Button'

import { Text } from '@components/usefull/Text'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Image as ImageIco, Share } from 'phosphor-react'
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
import { IProjectPreview } from '@hooks/useProjects/entities/IProjectPreview'
import { InfoDefault } from '@components/usefull/InfoDefault'
import { useUser } from '@hooks/useUser'
import { ContainerGrid } from '@components/usefull/ContainerGrid'

interface ICardProjectProps {
  project: IProjectPreview
  isSharable?: boolean
}

export function CardProject({
  project,
  isSharable = false,
}: ICardProjectProps) {
  const [onShareProject, setOnShareProject] = useState('')

  const router = useRouter()

  const { findProject } = useProjects()
  const { usersInProject, projectName, projectImage, createdAt } = findProject(
    project.id,
  )

  const { user } = useUser()

  return (
    <CardProjectContainer>
      <Preview
        title={projectName}
        as="button"
        onClick={() => {
          router.push(`/project/${project.id}`)
        }}
      >
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

        <ProjectInfos>
          <InfosContainer>
            <InfoDefault disableBold title="Nome do projeto" size="md">
              {projectName}
            </InfoDefault>
          </InfosContainer>

          <InfosContainer columns={3}>
            <InfoDefault disableBold title="Tipo do projeto" size="sm">
              {project.type}
            </InfoDefault>

            <InfoDefault disableBold title="Criador" size="sm">
              {project.creator.id !== user?.id
                ? project.creator.username
                : 'Você'}
            </InfoDefault>

            <InfoDefault disableBold title="Usuários com acesso" size="sm">
              {usersInProject.length}
            </InfoDefault>
          </InfosContainer>

          <InfosContainer columns={3}>
            {project?.features?.books && (
              <InfoDefault disableBold title="Livros" size="sm">
                {project.collections.book.itensLength ?? 0}
              </InfoDefault>
            )}

            {project?.features?.persons && (
              <InfoDefault disableBold title="Personagens" size="sm">
                {project.collections.person.itensLength ?? 0}
              </InfoDefault>
            )}

            {project?.features?.timeLines && (
              <InfoDefault disableBold title="Time-lines" size="sm">
                {project.collections.timeLine.itensLength}
              </InfoDefault>
            )}
          </InfosContainer>

          <ContainerGrid padding={0} columns={2}>
            {project?.features?.timeLines && (
              <InfoDefault disableBold title="A história se passa em" size="sm">
                {project.initialDate.year ?? 0}
              </InfoDefault>
            )}

            <InfoDefault disableBold title="Criado em" size="sm">
              {createdAt}
            </InfoDefault>
          </ContainerGrid>

          <Text as="span" family="body" size="sm" height="shorter">
            Usuários com acesso:
          </Text>

          <UsersWhitAccess>
            <UserImage first>
              <AvatarWeb
                whitShadow
                src={project.creator.avatar.url}
                size="xsm"
                alt={project.creator.avatar.alt}
              />
            </UserImage>
            {usersInProject.map((u) => {
              return (
                <UserImage key={u.id}>
                  <AvatarWeb
                    whitShadow
                    src={u.avatar.url}
                    size="xsm"
                    alt={u.avatar.alt}
                  />
                </UserImage>
              )
            })}
          </UsersWhitAccess>
        </ProjectInfos>
      </Preview>
      {isSharable && (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ShareProjectButton
              title="Compartilhar projeto"
              disabled={usersInProject.length >= 5}
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
