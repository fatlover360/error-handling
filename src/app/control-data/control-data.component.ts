import { Component, OnInit } from '@angular/core';
import {ControlData} from '../model/control-data';
import {ControlDataService} from './control-data.service';

@Component({
  selector: 'app-control-data',
  templateUrl: './control-data.component.html',
  styleUrls: ['./control-data.component.css']
})
export class ControlDataComponent implements OnInit {
  public controlDataArray: ControlData[];
  isLoading: boolean;

  constructor(private controlDataService: ControlDataService) { }

  ngOnInit() {
    this.isLoading = true;
    this.controlDataService.getControlDataItems().then(controlData => {
      this.controlDataArray = controlData;
      console.log(controlData);
      this.isLoading = false;
    });
  }
}
