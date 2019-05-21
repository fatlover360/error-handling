import { Component, OnInit } from '@angular/core';
import {ErrorCode} from '../model/error-code';
import {ErrorCodeService} from './error-code.service';

@Component({
  selector: 'app-error-code',
  templateUrl: './error-code.component.html',
  styleUrls: ['./error-code.component.css']
})
export class ErrorCodeComponent implements OnInit {
  public errorCodeArray: ErrorCode[];
  isLoading: boolean;

  constructor(private errorCodeService: ErrorCodeService) { }

  ngOnInit() {
    this.isLoading = true;
    this.errorCodeService.getErrorCodeItems().then(controlData => {
      this.errorCodeArray = controlData;
      this.isLoading = false;
    });
  }

}
