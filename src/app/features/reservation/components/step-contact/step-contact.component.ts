import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-step-contact',
  imports: [InputTextModule, ReactiveFormsModule],
  templateUrl: './step-contact.component.html',
  styleUrl: './step-contact.component.scss'
})
export class StepContactComponent {
  @Input() form!: FormGroup
}
