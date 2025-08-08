import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRegionComponent } from './step-region.component';

describe('StepRegionComponent', () => {
  let component: StepRegionComponent;
  let fixture: ComponentFixture<StepRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepRegionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
