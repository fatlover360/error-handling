import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicDialogRef, SelectItem} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorCodeService} from './error-code.service';

@Component({
  selector: 'app-catalog-form',
  templateUrl: 'error-code-form.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [FormBuilder, DynamicDialogRef, DynamicDialogConfig]
})
export class ErrorCodeFormComponent implements OnInit, OnDestroy {

  @Input() EAI_ERROR_CODE_ID: number;
  @Input() EAI_ERROR_CODE: string;
  @Input() EAI_ERROR_CODE_DESCRIPTION: string;
  @Input() ISERROR: string;

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
      'EAI_ERROR_CODE_DESCRIPTION': new FormControl(this.EAI_ERROR_CODE_DESCRIPTION, Validators.required),
      'ISERROR': new FormControl(this.ISERROR)
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.submitFormObj.unsubscribe();
    this.cancelForm.unsubscribe();
  }

  submitForm() {
    /*
    let catalog: Catalog = this.formErrorCode.value;
    catalog.EAI_CATALOG_ID = this.EAI_CATALOG_ID;
    catalog.HAS_HANDLING = this.HAS_HANDLING;
    catalog.HAS_SEQUENCE = this.HAS_SEQUENCE;
    console.log(this.mode);
    if(this.mode == 'edit'){
      this.catalogService.updateCatalogItem(catalog).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.formErrorCode.reset();
      }, error => {
        console.log(error);
      });
    }else {
      this.catalogService.addCatalogItem(catalog).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.HAS_HANDLING = false;
        this.HAS_SEQUENCE = false;
        this.formErrorCode.reset();
      }, error => {
        console.log(error);
      });
    }*/
  }

  cancel() {
    this.display = false;
    this.formErrorCode.reset();
  }

  hasHandling() {
   // this.HAS_HANDLING = !this.HAS_HANDLING
  }

  hasSequence() {
    //this.HAS_SEQUENCE = !this.HAS_SEQUENCE
  }
}
