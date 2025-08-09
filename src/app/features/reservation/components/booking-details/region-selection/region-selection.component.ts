import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SuggestedRegion } from '../../../models/region.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-region-selection',
  imports: [CommonModule, RadioButtonModule, ReactiveFormsModule, TableModule],
  templateUrl: './region-selection.component.html',
  styleUrl: './region-selection.component.scss'
})
export class RegionSelectionComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() suggestedRegions!: SuggestedRegion[];

  constructor() {}

  ngOnInit(): void {}

}
