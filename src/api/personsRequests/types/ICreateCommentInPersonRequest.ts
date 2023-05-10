export interface ICreateCommentInPersonRequest {
  personId: string
  objectComment: {
    toObjectId: string
    comment: {
      content: string
      commentIn:
        | 'appearance'
        | 'objective'
        | 'personality'
        | 'dream'
        | 'fear'
        | 'power'
        | 'couple'
        | 'value'
        | 'wishe'
        | 'trauma'
    }
  }
}
