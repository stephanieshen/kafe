import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Observable, Subject, takeUntil } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { STEPS } from '../../constants/steps.const';
import { SuggestedRegion } from '../../models/region.model';
import { Step } from '../../models/step.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  imports: [
    Components,
    ButtonModule,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    StepperModule,
  ],
  providers: [ReservationService],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent implements OnInit, OnDestroy {
  reservations$!: Observable<Reservation>[];
  reservationForm!: FormGroup;
  steps: Step[] = STEPS;
  suggestedRegions$!: Observable<SuggestedRegion[]>;

  private destroyed$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initReservationForm();
    this.initFormListener();
    this.suggestedRegions$ = this.reservationService.getSuggestedRegions$();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  submit(): void {
    this.reservationService.book(this.reservationForm.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.router.navigate(['reservation', 'completed']);
        }
      });
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

  private initFormListener(): void {
    const fieldsToWatch = [
      'date',
      'timeslot',
      'partySize',
      'childrenAllowed',
      'smokingAllowed'
    ];

    fieldsToWatch.forEach(field => {
      this.reservationForm.get(field)?.valueChanges
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => setTimeout(() => {
            console.log('set');
            this.setSuggestedRegions();
          }, 200)
        });
    });
  }

  private setSuggestedRegions(): void {
    const formValue = this.reservationForm.value;
    this.reservationService.setSuggestedRegions(formValue);
  }
}