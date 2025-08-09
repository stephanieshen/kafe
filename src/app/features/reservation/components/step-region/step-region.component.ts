import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Region } from '../../models/region.model';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-step-region',
  imports: [DropdownModule, ReactiveFormsModule],
  templateUrl: './step-region.component.html',
  styleUrl: './step-region.component.scss'
})
export class StepRegionComponent implements OnInit {
  @Input() form!: FormGroup;

  regions: Region[] = [];

  constructor() {}

  ngOnInit(): void {
    this.regions = this.getRegions();
  }

  private getRegions(): Region[] {
    return [
      {
        id: 1,
        label: 'Main Hall'
      },
      {
        id: 2,
        label: 'Bar'
      },
      {
        id: 3,
        label: 'Riverside'
      },
      {
        id: 4,
        label: 'Riverside (Smoking)'
      }
    ]
  }

}
