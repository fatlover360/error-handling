import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicDialogRef, SelectItem} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorCodeService} from './error-code.service';
import {ErrorCode} from '../model/error-code';

@Component({
  selector: 'app-error-code-form',
  templateUrl: 'error-code-form.component.html',
  styleUrls: ['./error-code.component.css'],
  providers: [FormBuilder, DynamicDialogRef, DynamicDialogConfig]
})
export class ErrorCodeFormComponent implements OnInit, OnDestroy {

  @Input() EAI_ERROR_CODE_ID: number;
  @Input() EAI_ERROR_CODE: string;
  @Input() EAI_ERROR_CODE_DESC: string;
  @Input() IS_ERROR: boolean;

  @Input() mode: string;

  @Input() display: boolean = false;

  @Output() submitFormObj = new EventEmitter<string>();
  @Output() cancelForm = new EventEmitter<void>();
  formErrorCode: FormGroup = null;
  loading = true;
  booleans: SelectItem[];

  constructor(private errorCodeService: ErrorCodeService) {
  }

  ngOnInit() {

    this.booleans = [];
    this.booleans.push({label: 'Select Value', value: ''});
    this.booleans.push({label: 'HTTP', value: 'HTTP'});
    this.booleans.push({label: 'SOAP', value: 'SOAP'});
    this.booleans.push({label: 'JMS', value: 'JMS'});

    this.formErrorCode = new FormGroup({
      'EAI_ERROR_CODE': new FormControl(this.EAI_ERROR_CODE, Validators.required),
      'EAI_ERROR_CODE_DESC': new FormControl(this.EAI_ERROR_CODE_DESC, Validators.required),
      'IS_ERROR': new FormControl(this.IS_ERROR)
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.submitFormObj.unsubscribe();
    this.cancelForm.unsubscribe();
  }

  submitForm() {

    let errorCode: ErrorCode = this.formErrorCode.value;
    errorCode.IS_ERROR = this.IS_ERROR;
    errorCode.EAI_ERROR_CODE_ID = this.EAI_ERROR_CODE_ID;

    console.log(this.mode);
    if(this.mode == 'edit'){
      this.errorCodeService.updateErrorCodeItem(errorCode).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.formErrorCode.reset();
      }, error => {
        console.log(error);
      });
    }else {
      this.errorCodeService.addErrorCodeItem(errorCode).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.IS_ERROR = false;
        this.formErrorCode.reset();
      }, error => {
        console.log(error);
      });
    }
  }

  cancel() {
    this.display = false;
    this.formErrorCode.reset();
  }

  isError() {
    this.IS_ERROR = !this.IS_ERROR;
  }

}
