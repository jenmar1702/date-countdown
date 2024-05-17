import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { LocalStoreService } from '../../services/local-store.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() eventName!: string
  @Input() eventDate!: Date

  @Output() onFormGroupChange = new EventEmitter<{ name: string; date: Date }>()

  eventForm!: FormGroup
  private formChangeSubscription: Subscription = new Subscription()

  constructor(private localStoreService: LocalStoreService) {}

  ngOnInit() {
    this.eventForm = new FormGroup({
      name: new FormControl(this.eventName, [Validators.required]),
      date: new FormControl(this.eventDate.toISOString().substring(0, 10), [Validators.required]),
    })

    this.formChangeSubscription = this.eventForm.valueChanges.subscribe(() => {
      // Update localStorage when form values change
      this.onFormGroupChange.emit(this.eventForm.value)
      this.localStoreService.setEventName(this.eventForm.value.name)
      this.localStoreService.setEventDate(this.eventForm.value.date)
    })
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leak
    if (this.formChangeSubscription) {
      this.formChangeSubscription.unsubscribe()
    }
  }
}
