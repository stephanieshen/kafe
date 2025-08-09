import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Region } from '../../models/region.model';
import { DropdownModule } from 'primeng/dropdown';
import { REGIONS } from '../../constants/regions.const';

@Component({
  selector: 'app-step-region',
  imports: [DropdownModule, ReactiveFormsModule],
  templateUrl: './step-region.component.html',
  styleUrl: './step-region.component.scss'
})
export class StepRegionComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() suggestedRegions: Region[] = [];

  constructor() {}

  ngOnInit(): void {}

}
