import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-complete-reservation',
  imports: [ButtonModule, CardModule],
  templateUrl: './complete-reservation.component.html',
  styleUrl: './complete-reservation.component.scss'
})
export class CompleteReservationComponent {

  constructor(
    private router: Router
  ) {}

  bookAnother(): void {
    this.router.navigate(['reservation', 'booking-form']);
  }
}
