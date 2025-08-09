import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
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
export class ReservationComponent implements OnInit {
  isCompleted: boolean = false;
  reservations$!: Observable<Reservation>[];
  reservationForm!: FormGroup;
  steps: Step[] = STEPS;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.initReservationForm();
    this.reservationService.getReservationState$().subscribe(x => console.log('state', x))
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
    
    // user inputs date and time
    // user inputs pax and preferences
    // const suggestedRegions = check availble regions based on preferences
    // chekc suggestedRegions availability


    // suggestedRegions = get available regions based on prefences
    // already have suggestedRegions
    // storedRegions = next is to check store and filter the regions based on suggestedRegions 
    // already have storedRegions
    // next is to filter this storedRegions based on selected date and time
    // already have storedRegions based on user selected date and time (and also on preferences)
    // check if pax still availabel

    if (nextStepItem?.code === 'region-selection') {
      const suggestedRegions = this.getRegionsBasedOnPreferences();
      console.log(suggestedRegions)
    }
  }

  getRegionsBasedOnPreferences(): Region[] {
    const isChildrenAllowed = this.chilredAllowed.value;
    const isSmokingAllowed = this.smokingAllowed.value;

    return filter(REGIONS, (region: Region) => {
      return region.isChildrenAllowed === isChildrenAllowed &&
             region.isSmokingAllowed === isSmokingAllowed;
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
}