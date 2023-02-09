import { Button, Checkbox, Text } from '@og-ui/react'
import { useContext, useState } from 'react'
import { z } from 'zod'
import { ISetSceneToCompleteRequest } from '../../../api/booksRequests/types/ISetSceneToCompleteRequest'
import { IScene } from '../../../api/responsesTypes/IBooksResponse'
import { IPersonsResponse } from '../../../api/responsesTypes/IPersonsResponse'
import { ProjectsContext } from '../../../contexts/projects'
import { Avatares } from '../../Avatares'
import { InfoDefault } from '../../usefull/InfoDefault'
import {
  CheckedScene,
  InputContainer,
  SceneCardContainer,
  SceneCompleteAndObjective,
  SceneContent,
  SceneHeading,
  WrittenWordsInput,
} from './styles'

interface ISceneCardProps {
  bookId: string
  capituleId: string
  scene: IScene
  persons: IPersonsResponse[]
}

const writtenWordsInput = z.string().regex(/^([0-9]+)$/, {
  message: 'Coloque apenas números na idade do personagem.',
})

export function SceneCard({
  scene,
  persons,
  bookId,
  capituleId,
}: ISceneCardProps) {
  const [checked, setChecked] = useState(false)
  const [writtenWords, setWrittenWords] = useState('')
  const [errorIn, setErrorIn] = useState('')

  const { setSceneToComplete } = useContext(ProjectsContext)

  async function handleSetCompleteScene() {
    setErrorIn('')

    try {
      writtenWordsInput.parse(writtenWords)
    } catch (err) {
      return setErrorIn('writtenWords')
    }

    const setCompleteScene: ISetSceneToCompleteRequest = {
      bookId,
      capituleId,
      sceneId: scene.id,
      writtenWords,
    }

    const isSet = await setSceneToComplete(setCompleteScene)

    if (isSet) {
      setChecked(false)
    }
  }

  return (
    <SceneCardContainer>
      <SceneHeading as="header">
        Cena: {scene.sequence}
        <div className="buttons">
          {!scene.complete && (
            <Checkbox onCheckedChange={() => setChecked(!checked)} />
          )}
        </div>
      </SceneHeading>
      {checked ? (
        <CheckedScene>
          <div className="form">
            <InputContainer title="">
              <Text family="body" size="sm">
                Numero de palavras escritas
                <Text as="span" family="body" size="sm">
                  {errorIn === 'writtenWords' && 'Coloque apenas números'}
                </Text>
              </Text>

              <WrittenWordsInput
                variant={errorIn === 'writtenWords' ? 'denied' : 'default'}
                onChange={(e) => setWrittenWords(e.target.value)}
                value={writtenWords}
              />
            </InputContainer>

            <Button
              align="center"
              label="Marcar como concluído"
              onClick={handleSetCompleteScene}
              disabled={!writtenWords}
            />
          </div>
        </CheckedScene>
      ) : (
        <>
          <SceneContent>
            {scene.complete && (
              <InfoDefault title="Palavras escritas:">
                {scene.writtenWords}
              </InfoDefault>
            )}

            <SceneCompleteAndObjective complete={scene.complete}>
              <InfoDefault title="Objetivo da cena">
                {scene.objective}
              </InfoDefault>

              <InfoDefault title="Completo">
                <span className="complete">
                  {scene.complete ? 'Sim' : 'Não'}
                </span>
              </InfoDefault>
            </SceneCompleteAndObjective>

            <InfoDefault title="Personagens na cena:">
              <Avatares
                size="2xs"
                columns={10}
                listEmptyMessage="Nenhum personagem presente na cena"
                persons={persons}
              />
            </InfoDefault>

            <InfoDefault title="Estrutura - Ato 1:">
              {scene.structure.act1}
            </InfoDefault>

            <InfoDefault title="Estrutura - Ato 2:">
              {scene.structure.act2}
            </InfoDefault>

            <InfoDefault title="Estrutura - Ato 3:">
              {scene.structure.act3}
            </InfoDefault>
          </SceneContent>
        </>
      )}
    </SceneCardContainer>
  )
}
