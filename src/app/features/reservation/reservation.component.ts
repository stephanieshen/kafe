import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

import { Components } from './components';

@Component({
  selector: 'app-reservation',
  imports: [
    Components,
    ButtonModule,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    StepperModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;
  steps: string[] = []

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.steps = this.getSteps();
    this.initReservationForm();
  }

  submit(): void {
    console.log(this.reservationForm.value);
  }

  private initReservationForm(): void {
    this.reservationForm = this.formBuilder.group({
      date: [null, Validators.required],
      time: [null, Validators.required],
      partySize: [null, [Validators.required, Validators.min(1)]],
      region: [null, [Validators.required]],
      childrenAllowed: [null],
      smokingAllowed: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  private getSteps(): string[] {
    return [
      'Choose Date & Time',
      'Party Size & Preferences',
      'Region Selection',
      'Contact Details',
      'Review and Confirm'
    ];
  }
}
