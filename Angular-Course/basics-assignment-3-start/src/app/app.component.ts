import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .moreThanFive {
        color: white;
      }
    `,
  ],
})
export class AppComponent {
  currentVal = 0;
  displayDetails = false;
  logs = [];

  showDetails() {
    this.logs.push(this.currentVal++);
    this.displayDetails = !this.displayDetails;
  }

  getColor() {
    return this.currentVal >= 5 ? 'blue' : '';
  }
}
