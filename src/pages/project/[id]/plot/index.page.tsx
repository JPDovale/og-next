import { IError } from '@@types/errors/IError'
import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { PlotParts } from '@components/ProjectsComponents/PlotParts'
import { ButtonIcon, ButtonRoot } from '@components/usefull/Button'
import { TextInputInput, TextInputRoot } from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { ToastError } from '@components/usefull/ToastError'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { useScroll } from '@hooks/useScroll'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Pencil } from 'phosphor-react'
import { ChangeEvent, FocusEvent, useState } from 'react'

import {
  BoxInput,
  BoxInputUrlOfText,
  BoxInputUrlOfTextContainer,
  BoxInputUrlOfTextHeader,
  Container,
  LinkOfText,
} from './styles'

export default function PlotPage() {
  const [urlOfText, setUrlOfText] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}`)

  const { scrollRef, handleScroll } = useScroll<HTMLDivElement>()

  const { project, projectName, permission, callEvent, loadingProject } =
    useProject(id as string)

  async function handleEditUrlOfText(e: FocusEvent<HTMLFormElement>) {
    e.preventDefault()

    const updatedPlot: IUpdatePlotDTO = { urlOfText }

    await callEvent.updatePlot(updatedPlot)

    if (!error) setUrlOfText('')
  }

  return (
    <>
      <NextSeo title={`${projectName}-Plot | Ognare`} noindex />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isFullScreen
      >
        <ToastError error={error} setError={setError} />

        <Container ref={scrollRef} onScroll={handleScroll}>
          {permission === 'edit' && !loadingProject && (
            <BoxInputUrlOfTextContainer>
              <BoxInputUrlOfText as="label">
                <BoxInputUrlOfTextHeader>
                  <Text weight="bold" css={{ color: '$black' }}>
                    Insira a url do seu arquivo de escrita.
                  </Text>

                  <Text family="body" size="lg" height="shorter">
                    Para que os usuários que tem acesso ao seu projeto poderem
                    acessar o texto, você precisa selecionar a opção de
                    compartilhamento &ldquo;Qualquer pessoas com o link.&ldquo;
                    no ambiente onde você escreve. Para isso é necessário que o
                    serviço que você esteja usando, tenha a opção de
                    compartilhar os aquivo.
                  </Text>
                </BoxInputUrlOfTextHeader>

                <BoxInput onSubmit={handleEditUrlOfText}>
                  <TextInputRoot id="linkOfText">
                    <TextInputInput
                      type="url"
                      placeholder={project?.url_text || 'https://exemplo.com'}
                      value={urlOfText}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUrlOfText(e.target.value)
                      }
                    />
                  </TextInputRoot>

                  <ButtonRoot wid="hug" disabled={!urlOfText} type="submit">
                    <ButtonIcon>
                      <Pencil />
                    </ButtonIcon>
                  </ButtonRoot>
                </BoxInput>

                {project?.url_text && (
                  <LinkOfText
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.url_text}
                  >
                    <Text css={{ color: '$black' }} weight="bold" size="sm">
                      Link do texto:
                    </Text>
                    {project.url_text}
                  </LinkOfText>
                )}
              </BoxInputUrlOfText>
            </BoxInputUrlOfTextContainer>
          )}

          {!loadingProject && (
            <PlotParts projectId={project?.id!} columns={1} />
          )}
        </Container>
      </ProjectPageLayout>
    </>
  )
}
