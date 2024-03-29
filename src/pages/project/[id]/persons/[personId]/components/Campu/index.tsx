import {
  IInCouplePerson,
  IPersonInObject,
  ISubObject,
} from '@api/responsesTypes/person/IPerson'
import { GenericCardObject } from '@components/PersonsComponents/GenericCardObject'
import { Error } from '@components/usefull/Error'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { Loading } from '@components/usefull/Loading'
import { useRouter } from 'next/router'
import { PlusCircle } from 'phosphor-react'
import { ReactNode } from 'react'
import { CampuContainer, CampuContent, HeadingCampu } from './styles'

interface IObjectOfCampu {
  id?: string
  infos: {
    title: string
    description: string
    createdAt: Date
  }
  collections?: {
    consequence?: {
      itens?: ISubObject[]
    }
    exception?: {
      itens?: ISubObject[]
    }
    referencesIt?: {
      itens: IPersonInObject[]
    }
    couple?: IInCouplePerson
  }
}

interface ICampuProps {
  icon: ReactNode
  title: string
  keyIndex: string
  objectOfCampu: IObjectOfCampu[]
  columns?: 1 | 2 | 3
  withSubObjects?: 'consequências' | 'exceções' | undefined
  isUniqueRelational?: boolean
  permission: 'view' | 'edit' | 'comment' | undefined
  isLoading: boolean
}

export function Campu({
  icon,
  title,
  keyIndex,
  objectOfCampu,
  columns = 3,
  withSubObjects,
  isUniqueRelational = false,
  permission,
  isLoading,
}: ICampuProps) {
  const router = useRouter()
  const { id, personId } = router.query

  return (
    <CampuContainer>
      {isLoading ? (
        <Loading />
      ) : !isLoading && !objectOfCampu ? (
        <Error />
      ) : (
        <>
          <HeadingCampu size="sm">
            {icon}
            {title}
            {permission === 'edit' && (
              <PlusCircle
                size={40}
                onClick={() =>
                  router.push(
                    `/project/${id}/persons/${personId}/${keyIndex}/new`,
                  )
                }
              />
            )}
          </HeadingCampu>

          <CampuContent columns={columns} isEmpty={!objectOfCampu[0]}>
            {objectOfCampu && objectOfCampu[0] ? (
              objectOfCampu.map((object) => {
                const subObjects =
                  object.collections?.consequence?.itens ||
                  object.collections?.exception?.itens

                return (
                  <GenericCardObject
                    to={keyIndex}
                    key={object.id}
                    object={object}
                    withSubObjects={withSubObjects && withSubObjects}
                    subObjects={withSubObjects && subObjects}
                    isUniqueRelational={isUniqueRelational}
                  />
                )
              })
            ) : (
              <ListEmpty
                icon={icon}
                message={`Nenhum(a) ${title} foi adicionado(a) ainda`}
              />
            )}
          </CampuContent>
        </>
      )}
    </CampuContainer>
  )
}
