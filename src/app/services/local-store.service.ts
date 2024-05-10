import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  private readonly eventNameKey = 'eventName'
  private readonly eventDateKey = 'eventDate'

  getEventName(): string | null {
    try {
      return localStorage.getItem(this.eventNameKey)
    } catch (error) {
      console.error('Error retrieving event name from local storage:', error)
      return null
    }
  }

  getEventDate(): Date | null {
    try {
      const storedDate = localStorage.getItem(this.eventDateKey)
      return storedDate ? new Date(storedDate) : null
    } catch (error) {
      console.error('Error retrieving event date from local storage:', error)
      return null
    }
  }

  setEventName(value: string): void {
    localStorage.setItem(this.eventNameKey, value)
  }

  setEventDate(dateValue: Date): void {
    localStorage.setItem(this.eventDateKey, dateValue.toString())
  }
}
