import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'error-handling';

  sidebarActive: boolean;

  onMenuButtonClick(event: Event) {
    this.sidebarActive = !this.sidebarActive;

    event.preventDefault();
  }
}
