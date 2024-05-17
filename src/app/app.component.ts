import { Component, OnDestroy, OnInit } from '@angular/core'
import { EventFormComponent } from './components/event-form/event-form.component'
import { TextFitDirective } from './directives/text-fit.directive'
import { LocalStoreService } from './services/local-store.service'
import { TimeService } from './services/time.service'
import { Subscription, interval } from 'rxjs'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventFormComponent, TextFitDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  countdownText = ''
  eventName = this.localStoreService.getEventName() ?? 'Midsummer Eve'
  eventDate = this.localStoreService.getEventDate() ?? new Date('2024-06-22')

  private countdownInterval$ = new Subscription()

  constructor(
    private localStoreService: LocalStoreService,
    private timeService: TimeService,
  ) {}

  ngOnInit(): void {
    this.setCountdownText()
    this.startCountdown()
  }

  ngOnDestroy() {
    this.stopCountdown()
  }

  onFormGroupChangeEvent(formData: { name: string; date: Date }): void {
    this.eventName = formData.name
    this.eventDate = formData.date
    this.startCountdown()
  }

  private startCountdown(): void {
    this.stopCountdown() // stop the countdown if it's already running

    this.countdownInterval$ = interval(1000).subscribe(() => {
      this.setCountdownText()
    })
  }

  private setCountdownText(): void {
    const now = new Date()
    const timeDiff = new Date(this.eventDate).getTime() - now.getTime()

    if (timeDiff > 0) {
      const { days, hours, minutes, seconds } = this.timeService.extractTimeUnits(timeDiff)
      this.countdownText = this.timeService.displayCountDown(days, hours, minutes, seconds)
    } else {
      this.countdownText = this.timeService.displayCountDown(0, 0, 0, 0)
      this.stopCountdown()
    }
  }

  private stopCountdown(): void {
    this.countdownInterval$.unsubscribe()
  }
}
