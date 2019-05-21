import { Component, OnInit } from '@angular/core';
import {ErrorService} from '../model/error-service';
import {ErrorServiceService} from './error-service.service';

@Component({
  selector: 'app-error-service',
  templateUrl: './error-service.component.html',
  styleUrls: ['./error-service.component.css']
})
export class ErrorServiceComponent implements OnInit {

  public errorServiceArray: ErrorService[];
  isLoading: boolean;

  constructor(private errorServiceService: ErrorServiceService) { }

  ngOnInit() {
    this.isLoading = true;
    this.errorServiceService.getErrorServiceItems().then(controlData => {
      this.errorServiceArray = controlData;
      this.isLoading = false;
    });
  }

}
