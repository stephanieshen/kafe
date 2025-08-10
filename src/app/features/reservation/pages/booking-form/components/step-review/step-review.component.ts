import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../../models/reservation.model';

@Component({
  selector: 'app-step-review',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-review.component.html',
  styleUrl: './step-review.component.scss'
})
export class StepReviewComponent implements OnInit {
  @Input() formValue!: Reservation;

  ngOnInit(): void {}
}
