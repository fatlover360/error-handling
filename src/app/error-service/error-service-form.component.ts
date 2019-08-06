import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicDialogRef, SelectItem} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from '../model/error-service';
import {ErrorServiceService} from './error-service.service';

@Component({
  selector: 'app-error-service-form',
  templateUrl: 'error-service-form.component.html',
  styleUrls: ['./error-service.component.css'],
  providers: [FormBuilder, DynamicDialogRef, DynamicDialogConfig]
})
export class ErrorServiceFormComponent implements OnInit, OnDestroy {

  @Input() EAI_ERROR_SERVICE_ID: number;
  @Input() APPLICATION_NAME: string;
  @Input() EAI_CATALOG_ID: number;
  @Input() SYSTEM_NATIVE_CODE: string;
  @Input() EAI_ERROR_CODE_ID: number;
  @Input() IS_ERROR: boolean;

  @Input() mode: string;

  @Input() display: boolean = false;

  @Output() submitFormObj = new EventEmitter<string>();
  @Output() cancelForm = new EventEmitter<void>();
  formErrorService: FormGroup = null;
  loading = true;
  booleans: SelectItem[];

  constructor(private errorServiceService: ErrorServiceService) {
  }

  ngOnInit() {

    this.booleans = [];
    this.booleans.push({label: 'Select Value', value: ''});
    this.booleans.push({label: 'HTTP', value: 'HTTP'});
    this.booleans.push({label: 'SOAP', value: 'SOAP'});
    this.booleans.push({label: 'JMS', value: 'JMS'});

    this.formErrorService = new FormGroup({
      'APPLICATION_NAME': new FormControl(this.APPLICATION_NAME, Validators.required),
      'EAI_CATALOG_ID': new FormControl(this.EAI_CATALOG_ID, Validators.required),
      'SYSTEM_NATIVE_CODE': new FormControl(this.SYSTEM_NATIVE_CODE, Validators.required),
      'EAI_ERROR_CODE_ID': new FormControl(this.EAI_ERROR_CODE_ID, Validators.required),
      'IS_ERROR': new FormControl(this.IS_ERROR)

    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.submitFormObj.unsubscribe();
    this.cancelForm.unsubscribe();
  }

  submitForm() {

    let errorService: ErrorService = this.formErrorService.value;
    errorService.IS_ERROR = this.IS_ERROR;
    errorService.EAI_ERROR_SERVICE_ID = this.EAI_ERROR_SERVICE_ID;

    console.log(this.mode);
    if(this.mode == 'edit'){
      this.errorServiceService.updateErrorServiceItem(errorService).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.formErrorService.reset();
      }, error => {
        console.log(error);
      });
    }else {
      this.errorServiceService.addErrorServiceItem(errorService).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.IS_ERROR = false;
        this.formErrorService.reset();
      }, error => {
        console.log(error);
      });
    }
  }

  cancel() {
    this.display = false;
    this.formErrorService.reset();
  }

  isError() {
    this.IS_ERROR = !this.IS_ERROR;
  }

}
