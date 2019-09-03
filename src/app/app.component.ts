import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit  {
  sidebarActive: boolean;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onMenuButtonClick(event: Event) {
    this.sidebarActive = !this.sidebarActive;
    event.preventDefault();
  }

}
