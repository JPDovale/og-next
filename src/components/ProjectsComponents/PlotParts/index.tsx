import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { UserContext } from '@contexts/user'
import { useContext } from 'react'

import { PlotPart } from './components/PlotPart'

import { PlotPartsContainer } from './styles'

interface IPlotPartsProps {
  project?: IProjectResponse
  book?: IBooksResponse
  isPreview?: boolean
  columns?: 1 | 2 | 3 | 4
}

export function PlotParts({
  project,
  book,
  isPreview = false,
  columns = 3,
}: IPlotPartsProps) {
  const { user } = useContext(UserContext)

  const permission = project?.users?.find((u) => u.id === user?.id)?.permission

  const plot = project ? project?.plot : book?.plot
  const idObject = project ? project?.id : (book?.id as string)
  const isToProject = !!project

  return (
    <PlotPartsContainer isPreview={isPreview} columns={columns}>
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Ideia central"
        element={plot?.onePhrase}
        disabled={permission !== 'edit' && !plot?.onePhrase}
        keyValue={`${!isToProject ? 'plot/' : ''}onePhrase`}
      />

      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Premissa"
        element={plot?.premise}
        disabled={permission !== 'edit' && !plot?.premise}
        keyValue={`${!isToProject ? 'plot/' : ''}premise`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Narrador"
        element={plot?.storyteller}
        disabled={permission !== 'edit' && !plot?.storyteller}
        keyValue={`${!isToProject ? 'plot/' : ''}storyteller`}
      />
      {project && (
        <>
          <PlotPart
            isToProject={isToProject}
            idObject={idObject}
            isPreview={isPreview}
            permission={permission}
            to="Gênero literário"
            element={project.plot?.literaryGenere}
            disabled={permission !== 'edit' && !project.plot?.literaryGenere}
            keyValue={`${!isToProject ? 'plot/' : ''}literaryGenere`}
          />
          <PlotPart
            isToProject={isToProject}
            idObject={idObject}
            isPreview={isPreview}
            permission={permission}
            to="Subgênero"
            element={project.plot?.subgenre}
            disabled={permission !== 'edit' && !project.plot?.subgenre}
            keyValue={`${!isToProject ? 'plot/' : ''}subgenre`}
          />
        </>
      )}

      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Ambiente"
        element={plot?.ambient}
        disabled={permission !== 'edit' && !plot?.ambient}
        keyValue={`${!isToProject ? 'plot/' : ''}ambient`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Tempo em que se passa"
        element={plot?.countTime}
        disabled={permission !== 'edit' && !plot?.countTime}
        keyValue={`${!isToProject ? 'plot/' : ''}countTime`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Fato histórico"
        element={plot?.historicalFact}
        disabled={permission !== 'edit' && !plot?.historicalFact}
        keyValue={`${!isToProject ? 'plot/' : ''}historicalFact`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Detalhes"
        element={plot?.details}
        disabled={permission !== 'edit' && !plot?.details}
        keyValue={`${!isToProject ? 'plot/' : ''}details`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Resumo"
        element={plot?.summary}
        disabled={permission !== 'edit' && !plot?.summary}
        keyValue={`${!isToProject ? 'plot/' : ''}summary`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 1"
        element={plot?.structure?.act1 || ''}
        disabled={permission !== 'edit' && !plot?.structure?.act1}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 2"
        element={plot?.structure?.act2 || ''}
        disabled={permission !== 'edit' && !plot?.structure?.act1}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
      />
      <PlotPart
        isToProject={isToProject}
        idObject={idObject}
        isPreview={isPreview}
        permission={permission}
        to="Estrutura: Ato 3"
        element={plot?.structure?.act3 || ''}
        disabled={permission !== 'edit' && !plot?.structure?.act1}
        keyValue={`${!isToProject ? 'plot/' : ''}structure`}
      />
    </PlotPartsContainer>
  )
}
