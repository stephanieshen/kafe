import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-step-date-time',
  imports: [CalendarModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './step-date-time.component.html',
  styleUrl: './step-date-time.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StepDateTimeComponent {
  @Input() form!: FormGroup;

  minDate = new Date(2025, 6, 24);
  maxDate = new Date(2025, 6, 31);
}
