import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { RegionSelectionComponent } from './region-selection/region-selection.component';
import { SuggestedRegion } from '../../../../models/region.model';
import { Timeslot } from '../../../../models/timeslot.model';
import { generateTimeSlots } from '../../../../utils/generate-time-slots.util';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-booking-details',
  imports: [
    ButtonModule,
    CommonModule,
    CheckboxModule,
    DatePickerModule,
    RadioButtonModule,
    ReactiveFormsModule,
    RegionSelectionComponent,
    SelectModule,
  ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BookingDetailsComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() suggestedRegions!: SuggestedRegion[];

  minDate = new Date(2025, 6, 24);
  maxDate = new Date(2025, 6, 31);
  timeslots: Timeslot[] = [];
  sizes: number[] = [];

  ngOnInit(): void {
    this.timeslots = generateTimeSlots();
    this.sizes = this.getSizes();
  }

  private getSizes(): number[] {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
 }
