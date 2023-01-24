import { useContext } from 'react'
import { IProjectResponse } from '../../api/responsesTypes/IProjcetResponse'
import { UserContext } from '../../contexts/user'
import { PlotPart } from './components/PlotPart'

import { PlotPartsContainer } from './styles'

interface IPlotPartsProps {
  project: IProjectResponse
  isPreview?: boolean
}

export function PlotParts({ project, isPreview = false }: IPlotPartsProps) {
  const { user } = useContext(UserContext)

  const permission = project?.users?.find((u) => u.id === user?.id)?.permission

  return (
    <PlotPartsContainer isPreview={isPreview}>
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Ideia central"
        term="a"
        element={project?.plot.onePhrase}
        disabled={permission !== 'edit' && !project?.plot.onePhrase}
        keyValue="onePhrase"
      />

      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Premissa"
        term="a"
        element={project?.plot.premise}
        disabled={!project?.plot.onePhrase}
        keyValue="premise"
        last="Ideia central"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Narrador"
        term="o"
        element={project?.plot.storyteller}
        disabled={!project?.plot.premise}
        keyValue="storyteller"
        last="Premissa"
        lastTerm="a"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Gênero literário"
        term="o"
        element={project?.plot.literaryGenere}
        disabled={!project?.plot.storyteller}
        keyValue="literaryGenere"
        last="Narrador"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Subgênero"
        term="o"
        element={project?.plot.subgenre}
        disabled={!project?.plot.literaryGenere}
        keyValue="subgenre"
        last="Gênero literário"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Ambiente"
        term="o"
        element={project?.plot.ambient}
        disabled={!project?.plot.subgenre}
        keyValue="ambient"
        last="Subgênero"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Tempo em que se passa"
        term="o"
        element={project?.plot.countTime}
        disabled={!project?.plot.ambient}
        keyValue="countTime"
        last="Ambiente"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Fato histórico"
        term="o"
        element={project?.plot.historicalFact}
        disabled={!project?.plot.countTime}
        keyValue="historicalFact"
        last="Tempo em que se passa"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Detalhes"
        term="os"
        element={project?.plot.details}
        disabled={!project?.plot.historicalFact}
        keyValue="details"
        last="Fato histórico"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Resumo"
        term="o"
        element={project?.plot.summary}
        disabled={!project?.plot.details}
        keyValue="summary"
        last="Detalhes"
        lastTerm="os"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 1"
        term="a"
        element={
          project?.plot.structure?.act1 || ''
          // project?.plot.structure?.act2
          //   ? ' '
          //   : project?.plot.structure?.act3
          //   ? ' '
          //   : project?.plot.structure?.act1
        }
        disabled={!project?.plot.summary}
        keyValue="structure"
        last="Resumo"
        lastTerm="o"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 2"
        term="a"
        element={
          project?.plot.structure?.act2 || ''

          // project?.plot.structure?.act1
          //   ? ' '
          //   : project?.plot.structure?.act3
          //   ? ' '
          //   : project?.plot.structure?.act2
        }
        disabled={!project?.plot.summary}
        keyValue="structure"
        last="Resumo"
        lastTerm="o"
      />
      <PlotPart
        isInitialized={user?.isInitialized || false}
        projectId={project?.id as string}
        comments={project?.plot.comments}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 3"
        term="a"
        element={
          project?.plot.structure?.act3 || ''

          // project?.plot.structure?.act1
          //   ? ' '
          //   : project?.plot.structure?.act2
          //   ? ' '
          //   : project?.plot.structure?.act3
        }
        disabled={!project?.plot.summary}
        keyValue="structure"
        last="Resumo"
        lastTerm="o"
      />
    </PlotPartsContainer>
  )
}
