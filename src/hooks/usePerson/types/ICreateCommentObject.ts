export interface ICreateCommentObject {
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
