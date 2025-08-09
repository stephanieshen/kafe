import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Reservation } from '../../models/reservation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-review',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-review.component.html',
  styleUrl: './step-review.component.scss'
})
export class StepReviewComponent implements OnInit {
  @Input() formValue!: Reservation;

  ngOnInit(): void {
    console.log(this.formValue)
  }
}
