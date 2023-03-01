interface IReverbKeysR {
  onePhrase: string
  premise: string
  storyteller: string
  literaryGenere: string
  subgenre: string
  ambient: string
  countTime: string
  historicalFact: string
  details: string
  summary: string
  structure: string
  [x: string]: any
}

export const reverbKeys: IReverbKeysR = {
  onePhrase: 'Ideia central',
  premise: 'Premissa',
  storyteller: 'Narrador',
  literaryGenere: 'Gênero literário',
  subgenre: 'Subgênero',
  ambient: 'Ambiente',
  countTime: 'Tempo em que se passa',
  historicalFact: 'Fator histórico',
  details: 'Detalhes',
  summary: 'Resumo',
  structure: 'Estrutura',
}

export type IReverbKeys =
  | 'onePhrase'
  | 'premise'
  | 'storyteller'
  | 'literaryGenere'
  | 'subgenre'
  | 'ambient'
  | 'countTime'
  | 'historicalFact'
  | 'details'
  | 'summary'
  | 'structure'
