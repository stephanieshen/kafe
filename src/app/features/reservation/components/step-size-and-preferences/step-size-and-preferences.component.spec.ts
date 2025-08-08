import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSizeAndPreferencesComponent } from './step-size-and-preferences.component';

describe('StepSizeAndPreferencesComponent', () => {
  let component: StepSizeAndPreferencesComponent;
  let fixture: ComponentFixture<StepSizeAndPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepSizeAndPreferencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepSizeAndPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
