export interface ICreateTimeEventToDoDTO {
  happenedYear: number
  happenedMonth: number
  happenedDay: number
  happenedHour?: number | null
  happenedMinute?: number | null
  happenedSecond?: number | null
  title: string
  description: string
}
