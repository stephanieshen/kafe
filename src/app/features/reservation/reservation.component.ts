import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

import { Components } from './components';
import { Step } from './models/step.model';

@Component({
  selector: 'app-reservation',
  imports: [
    Components,
    ButtonModule,
    CardModule,
    CommonModule,
    StepperModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  steps: Step[] = [
    {
      value: 1,
      title: 'Choose Date & Time'
    },
    {
      value: 2,
      title: 'Party Size & Preferences'
    },
    {
      value: 3,
      title: 'Region Selection'
    },
    {
      value: 4,
      title: 'Contact Details'
    },
    {
      value: 5,
      title: 'Review and Confirm'
    }
  ]
}
