import { Button, Text, TextInput } from '@og-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Link, Pencil } from 'phosphor-react'
import { FocusEvent, useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../api/dtos/IUpdatePlotDTO'
import { PlotParts } from '../../../../components/PlotParts'
import { ProjectsContext } from '../../../../contexts/projects'
import { usePreventBack } from '../../../../hooks/usePreventDefaultBack'
import { useProject } from '../../../../hooks/useProject'
import { ProjectPageLayout } from '../../../../layouts/ProjectPageLayout'
import {
  BoxInput,
  BoxInputUrlOfText,
  BoxInputUrlOfTextContainer,
  BoxInputUrlOfTextHeader,
  LinkOfText,
} from './styles'

export default function PlotPage() {
  const [urlOfText, setUrlOfText] = useState('')

  const { loading, updatePlot, error } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}`)

  const { project, projectName, permission } = useProject(id as string)

  async function handleEditUrlOfText(e: FocusEvent<HTMLFormElement>) {
    e.preventDefault()

    const updatedPlot: IUpdatePlotDTO = { urlOfText }

    await updatePlot(updatedPlot, project?.id as string)

    if (!error) setUrlOfText('')
  }

  return (
    <>
      <NextSeo title={`${projectName}-Plot | Ognare`} noindex />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        {permission === 'edit' && !loading && (
          <BoxInputUrlOfTextContainer>
            <BoxInputUrlOfText>
              <BoxInputUrlOfTextHeader>
                <Text as="label" htmlFor="linkOfText" size="sm">
                  Insira a url do seu arquivo de escrita.
                </Text>

                <Text family="body" height="shorter">
                  Para que os usuários que tem acesso ao seu projeto poderem
                  acessar o texto, você precisa selecionar a opção de
                  compartilhamento &ldquo;Qualquer pessoas com o link.&ldquo; no
                  ambiente onde você escreve. Para isso é necessário que o
                  serviço que você esteja usando, tenha a opção de compartilhar
                  os aquivo.
                </Text>
              </BoxInputUrlOfTextHeader>

              <BoxInput onSubmit={handleEditUrlOfText}>
                <TextInput
                  type="url"
                  id="linkOfText"
                  icon={<Link />}
                  placeholder={
                    project?.plot?.urlOfText || 'https://exemplo.com'
                  }
                  value={urlOfText}
                  onChange={(e) => setUrlOfText(e.target.value)}
                />

                <Button
                  icon={<Pencil />}
                  wid="hug"
                  disabled={!urlOfText}
                  type="submit"
                />
              </BoxInput>

              {project?.plot?.urlOfText && (
                <LinkOfText
                  as="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.plot.urlOfText}
                  family="body"
                  height="shorter"
                >
                  <Text size="sm">Link do texto:</Text>
                  {project.plot.urlOfText}
                </LinkOfText>
              )}
            </BoxInputUrlOfText>
          </BoxInputUrlOfTextContainer>
        )}

        {!loading && <PlotParts project={project} columns={2} />}
      </ProjectPageLayout>
    </>
  )
}
