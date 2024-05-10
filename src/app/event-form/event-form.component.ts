import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { LocalStoreService } from '../services/local-store.service'

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent implements OnInit {
  @Input() eventName!: string
  @Input() eventDate!: Date

  @Output() private onFormGroupChange = new EventEmitter<any>()

  eventForm!: FormGroup

  constructor(private localStoreService: LocalStoreService) {}

  ngOnInit() {
    this.eventForm = new FormGroup({
      name: new FormControl(this.eventName, [Validators.required]),
      date: new FormControl(this.eventDate.toISOString().substring(0, 10), [Validators.required]),
    })

    this.eventForm.valueChanges.subscribe(() => {
      // Update localStorage when form values change
      this.onFormGroupChange.emit(this.eventForm.value)
      this.localStoreService.setEventName(this.eventForm.value.name)
      this.localStoreService.setEventDate(this.eventForm.value.date)
    })
  }
}
