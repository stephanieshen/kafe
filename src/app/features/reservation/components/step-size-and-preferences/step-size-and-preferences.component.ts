import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
  selector: 'app-step-size-and-preferences',
  imports: [CheckboxModule, ReactiveFormsModule],
  templateUrl: './step-size-and-preferences.component.html',
  styleUrl: './step-size-and-preferences.component.scss'
})
export class StepSizeAndPreferencesComponent {
  @Input() form!: FormGroup;
}
