import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IProjectResponse } from '@api/responsesTypes/IProjcetResponse'
import { UserContext } from '@contexts/user'
import { useContext } from 'react'

import { PlotPart } from './components/PlotPart'

import { PlotPartsContainer } from './styles'

interface IPlotPartsProps {
  project?: IProjectResponse
  book?: IBooksResponse
  isPreview?: boolean
  columns?: 2 | 3 | 4
}

export function PlotParts({
  project,
  book,
  isPreview = false,
  columns = 4,
}: IPlotPartsProps) {
  const { user } = useContext(UserContext)

  const permission = project?.users?.find((u) => u.id === user?.id)?.permission

  const plot = project ? project?.plot : book?.plot
  const comments = project ? project?.plot?.comments : book?.comments
  const idObject = project ? project?.id : (book?.id as string)
  const isToProject = !!project

  return (
    <PlotPartsContainer isPreview={isPreview} columns={columns}>
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Ideia central"
        term="a"
        element={plot?.onePhrase}
        disabled={permission !== 'edit' && !plot?.onePhrase}
        keyValue={`${!isToProject ? 'plot/' : ''}onePhrase`}
      />

      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Premissa"
        term="a"
        element={plot?.premise}
        disabled={!plot?.onePhrase}
        keyValue={`${!isToProject ? 'plot/' : ''}premise`}
        last="Ideia central"
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Narrador"
        term="o"
        element={plot?.storyteller}
        disabled={!plot?.premise}
        keyValue={`${!isToProject ? 'plot/' : ''}storyteller`}
        last="Premissa"
        lastTerm="a"
      />
      {project && (
        <>
          <PlotPart
            isToProject={isToProject}
            idObject={idObject}
            comments={comments}
            isPreview={isPreview}
            permission={permission}
            to="Gênero literário"
            term="o"
            element={project.plot?.literaryGenere}
            disabled={!plot?.storyteller}
            keyValue={`${!isToProject ? 'plot/' : ''}literaryGenere`}
            last="Narrador"
          />
          <PlotPart
            isToProject={isToProject}
            idObject={idObject}
            comments={comments}
            isPreview={isPreview}
            permission={permission}
            to="Subgênero"
            term="o"
            element={project.plot?.subgenre}
            disabled={!project.plot?.literaryGenere}
            keyValue={`${!isToProject ? 'plot/' : ''}subgenre`}
            last="Gênero literário"
          />
        </>
      )}

      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Ambiente"
        term="o"
        element={plot?.ambient}
        disabled={project ? !project.plot?.subgenre : false}
        keyValue={`${!isToProject ? 'plot/' : ''}ambient`}
        last="Subgênero"
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Tempo em que se passa"
        term="o"
        element={plot?.countTime}
        disabled={!plot?.ambient}
        keyValue={`${!isToProject ? 'plot/' : ''}countTime`}
        last="Ambiente"
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Fato histórico"
        term="o"
        element={plot?.historicalFact}
        disabled={!plot?.countTime}
        keyValue={`${!isToProject ? 'plot/' : ''}historicalFact`}
        last="Tempo em que se passa"
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Detalhes"
        term="os"
        element={plot?.details}
        disabled={!plot?.historicalFact}
        keyValue={`${!isToProject ? 'plot/' : ''}details`}
        last="Fato histórico"
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Resumo"
        term="o"
        element={plot?.summary}
        disabled={!plot?.details}
        keyValue={`${!isToProject ? 'plot/' : ''}summary`}
        last="Detalhes"
        lastTerm="os"
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 1"
        term="a"
        element={plot?.structure?.act1 || ''}
        disabled={!plot?.summary}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
        last="Resumo"
        lastTerm="o"
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 2"
        term="a"
        element={plot?.structure?.act2 || ''}
        disabled={!plot?.summary}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
        last="Resumo"
        lastTerm="o"
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        comments={comments}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 3"
        term="a"
        element={plot?.structure?.act3 || ''}
        disabled={!plot?.summary}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
        last="Resumo"
        lastTerm="o"
      />
    </PlotPartsContainer>
  )
}
