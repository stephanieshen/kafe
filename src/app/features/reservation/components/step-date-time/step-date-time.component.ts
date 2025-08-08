import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-step-date-time',
  imports: [ButtonModule, DatePickerModule, ReactiveFormsModule],
  templateUrl: './step-date-time.component.html',
  styleUrl: './step-date-time.component.scss'
})
export class StepDateTimeComponent {
  @Input() form!: FormGroup;
}
