import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { Timeslot } from '../../models/timeslot.model';
import { RadioButtonModule } from 'primeng/radiobutton';
import { generateTimeSlots } from '../../utils/generate-time-slots.util';

@Component({
  selector: 'app-step-date-time',
  imports: [
    CalendarModule,
    ButtonModule,
    RadioButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './step-date-time.component.html',
  styleUrl: './step-date-time.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StepDateTimeComponent implements OnInit {
  @Input() form!: FormGroup;

  minDate = new Date(2025, 6, 24);
  maxDate = new Date(2025, 6, 31);
  timeslots: Timeslot[] = [];

  ngOnInit(): void {
    this.timeslots = generateTimeSlots();
  }
 }
