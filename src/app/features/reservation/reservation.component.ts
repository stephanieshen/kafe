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
import { Step } from './models/step.model';
import { STEPS } from './constants/steps.const';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Reservation } from './models/reservation.model';
import { ReservationService } from './services/reservation.service';
import { Region, RegionAvailability, SuggestedRegion } from './models/region.model';

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
  suggestedRegions$!: Observable<SuggestedRegion[]>;

  private destroyed$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService
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

  bookAnother(): void {
    this.isCompleted = false;
  }

  submit(): void {
    console.log(this.reservationForm.value)
    // this.reservationService.book(this.reservationForm.value);
    // this.isCompleted = true;
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