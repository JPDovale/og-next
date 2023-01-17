export function reverbKeys(key: string) {
  switch (key) {
    case 'onePhrase': {
      return 'Ideia central'
    }
    case 'premise': {
      return 'Premissa'
    }
    case 'storyteller': {
      return 'Narrador'
    }
    case 'literaryGenere': {
      return 'Gênero literário'
    }
    case 'subgenre': {
      return 'Subgênero'
    }
    case 'ambient': {
      return 'Ambiente'
    }
    case 'countTime': {
      return 'Tempo em que se passa'
    }
    case 'historicalFact': {
      return 'Fator histórico'
    }
    case 'details': {
      return 'Detalhes'
    }
    case 'summary': {
      return 'Resumo'
    }
    case 'structure': {
      return 'Estrutura'
    }
    default:
      return ''
  }
}
