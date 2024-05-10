import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  readonly milliSecondsInASecond = 1000
  readonly secondsInAMinute = 60
  readonly minutesInAnHour = 60
  readonly hoursInADay = 24

  displayCountDown(days: number, hours: number, minutes: number, seconds: number): string {
    return `${days} days, ${hours} h, ${minutes} m, ${seconds} s`
  }

  extractTimeUnits(timeDiff: number): {
    days: number
    hours: number
    minutes: number
    seconds: number
  } {
    const totalSeconds = Math.floor(timeDiff / this.milliSecondsInASecond)
    const seconds = totalSeconds % this.secondsInAMinute
    const totalMinutes = Math.floor(totalSeconds / this.secondsInAMinute)
    const minutes = totalMinutes % this.minutesInAnHour
    const totalHours = Math.floor(totalMinutes / this.minutesInAnHour)
    const hours = totalHours % this.hoursInADay
    const days = Math.floor(totalHours / this.hoursInADay)

    return { days, hours, minutes, seconds }
  }
}
