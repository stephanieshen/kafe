import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepContactComponent } from './step-contact.component';

describe('StepContactComponent', () => {
  let component: StepContactComponent;
  let fixture: ComponentFixture<StepContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
