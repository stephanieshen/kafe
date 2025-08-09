import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-step-size-and-preferences',
  imports: [
    AutoCompleteModule,
    CheckboxModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './step-size-and-preferences.component.html',
  styleUrl: './step-size-and-preferences.component.scss',
})
export class StepSizeAndPreferencesComponent implements OnInit {
  @Input() form!: FormGroup;

  sizes: number[] = [];

  ngOnInit(): void {
    this.sizes = this.getSizes();
  }

  private getSizes(): number[] {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
}
