import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

import { Components } from './components';
import { Step } from './models/step.model';
import { find } from 'lodash-es';
import { STEPS } from './constants/steps.const';

@Component({
  selector: 'app-reservation',
  imports: [
    Components,
    ButtonModule,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    StepperModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;
  steps: Step[] = STEPS;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initReservationForm();
  }

  submit(): void {
    console.log(this.reservationForm.value);
  }

  bookReservation(): void {
    console.log(this.reservationForm.value)
  }

  handleNextStep(nextStep: number) {
    const nextStepItem = find(this.steps, ['step', nextStep]);
    
    // user inputs date and time
    // user inputs pax and preferences
    // const suggestedRegions = check availble regions based on preferences
    // chekc suggestedRegions availability
    if (nextStepItem?.code === 'region-selection') {
      
    }
  }

  private initReservationForm(): void {
    this.reservationForm = this.formBuilder.group({
      date: [new Date(2025, 6, 24), Validators.required],
      timeslot: [null, Validators.required],
      partySize: [null, [Validators.required, Validators.min(1)]],
      region: [null, [Validators.required]],
      childrenAllowed: [false],
      smokingAllowed: [false],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }
}