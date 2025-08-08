import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-step-date-time',
  imports: [ButtonModule, StepperModule],
  templateUrl: './step-date-time.component.html',
  styleUrl: './step-date-time.component.scss'
})
export class StepDateTimeComponent {

}
