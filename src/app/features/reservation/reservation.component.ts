import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
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
import { filter, find } from 'lodash-es';
import { STEPS } from './constants/steps.const';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Reservation } from './models/reservation.model';
import { ReservationService } from './services/reservation.service';
import { Timeslot } from './models/timeslot.model';
import { REGIONS } from './constants/regions.const';
import { Region } from './models/region.model';

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
  providers: [ReservationService],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent implements OnInit, OnDestroy {
  isCompleted: boolean = false;
  reservations$!: Observable<Reservation>[];
  reservationForm!: FormGroup;
  steps: Step[] = STEPS;
  suggestedRegions: Region[] = [];

  private destroyed$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.initReservationForm();
    this.reservationService.getsRegionsAvailability$().subscribe(x => console.log('state', x))
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  get date(): AbstractControl {
    return this.reservationForm.get('date') as AbstractControl;
  }

  get time(): AbstractControl {
    return this.reservationForm.get('timeslot') as AbstractControl;
  }

  get partySize(): AbstractControl {
    return this.reservationForm.get('partySize') as AbstractControl;
  }

  get chilredAllowed(): AbstractControl {
    return this.reservationForm.get('childrenAllowed') as AbstractControl;
  }

  get smokingAllowed(): AbstractControl {
    return this.reservationForm.get('smokingAllowed') as AbstractControl;
  }

  bookAnother(): void {
    this.isCompleted = false;
  }

  submit(): void {
    this.reservationService.book(this.reservationForm.value);
    this.isCompleted = true;
  }

  handleNextStep(nextStep: number) {
    const nextStepItem = find(this.steps, ['step', nextStep]);

    if (nextStepItem?.code === 'region-selection') {
      const reservation = this.reservationForm.value;
      this.reservationService.getSuggestedRegions$(reservation)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (regionsAvailability) => {
            this.suggestedRegions = regionsAvailability.map(availability => availability.region);
          }
        })
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