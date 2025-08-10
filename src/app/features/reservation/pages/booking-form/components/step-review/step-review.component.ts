import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-review',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-review.component.html',
  styleUrl: './step-review.component.scss'
})
export class StepReviewComponent implements OnInit {
  @Input() form!: FormGroup;

  ngOnInit(): void {}
}
