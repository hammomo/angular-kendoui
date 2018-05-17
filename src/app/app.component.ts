import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Best Practice With Angular & Kendo UI';

  onButtonClick(): void {
    this.title = "Hello from Kendo UI!";
  }
}
