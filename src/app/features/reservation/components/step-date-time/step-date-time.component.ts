import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { Timeslot } from '../../models/timeslot.model';
import { RadioButtonModule } from 'primeng/radiobutton';

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
    this.timeslots = this.generateTimeSlots();
  }

  generateTimeSlots() {
    const slots: Timeslot[] = [];
    const startHour = 18; // 6 PM
    const endHour = 22; // 10 PM

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        label: this.formatLabel(hour, 0),
        value: this.formatValue(hour, 0),
      });
      slots.push({
        label: this.formatLabel(hour, 30),
        value: this.formatValue(hour, 30),
      });
    }

    return slots;
  }

  private formatLabel(hour24: number, minute: number): string {
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const ampm = hour24 < 12 ? 'AM' : 'PM';
    const minStr = minute === 0 ? '00' : minute.toString();
    return `${hour12}:${minStr} ${ampm}`;
  }

  private formatValue(hour24: number, minute: number): string {
    const hourStr = hour24.toString().padStart(2, '0');
    const minStr = minute === 0 ? '00' : minute.toString();
    return `${hourStr}:${minStr}`;
  }
}
