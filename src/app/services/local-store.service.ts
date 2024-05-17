import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  private readonly eventNameKey = 'eventName'
  private readonly eventDateKey = 'eventDate'

  getEventName(): string | null {
    return localStorage.getItem(this.eventNameKey)
  }

  getEventDate(): Date | null {
    const storedDate = localStorage.getItem(this.eventDateKey)
    return storedDate ? new Date(storedDate) : null
  }

  setEventName(value: string): void {
    localStorage.setItem(this.eventNameKey, value)
  }

  setEventDate(dateValue: Date): void {
    localStorage.setItem(this.eventDateKey, dateValue.toString())
  }
}
