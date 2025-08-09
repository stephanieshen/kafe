import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-complete-reservation',
  imports: [ButtonModule],
  templateUrl: './complete-reservation.component.html',
  styleUrl: './complete-reservation.component.scss'
})
export class CompleteReservationComponent {
  @Output() clickedBookAnother = new EventEmitter();

  bookAnother(): void {
    this.clickedBookAnother.emit();
  }
}
