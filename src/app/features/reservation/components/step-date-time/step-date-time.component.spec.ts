import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDateTimeComponent } from './step-date-time.component';

describe('StepDateTimeComponent', () => {
  let component: StepDateTimeComponent;
  let fixture: ComponentFixture<StepDateTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepDateTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
