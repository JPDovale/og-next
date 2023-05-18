export interface ICreateTimeEventDTO {
  happenedYear: number
  happenedMonth: number
  happenedDay: number
  happenedHour?: number | null
  happenedMinute?: number | null
  happenedSecond?: number | null
  timeChrist: 'A.C.' | 'D.C.'
  title: string
  description: string
  importance: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
}
