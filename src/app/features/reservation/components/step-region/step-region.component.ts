import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-region',
  imports: [ReactiveFormsModule],
  templateUrl: './step-region.component.html',
  styleUrl: './step-region.component.scss'
})
export class StepRegionComponent {
  @Input() form!: FormGroup;
}
