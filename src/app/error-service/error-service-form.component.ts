import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicDialogRef, SelectItem} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from '../model/error-service';
import {ErrorServiceService} from './error-service.service';
import {CatalogService} from '../catalog/catalog.service';
import {Application} from '../model/app';
import {ErrorCode} from '../model/error-code';
import {Catalog} from '../model/catalog';
import {ErrorCodeService} from '../error-code/error-code.service';

@Component({
  selector: 'app-error-service-form',
  templateUrl: 'error-service-form.component.html',
  styleUrls: ['./error-service.component.css'],
  providers: [FormBuilder, DynamicDialogRef, DynamicDialogConfig]
})
export class ErrorServiceFormComponent implements OnInit, OnDestroy {

  @Input() CATALOG: Catalog;
  @Input() ERROR_CODE: ErrorCode;
  @Input() EAI_ERROR_SERVICE_ID: number;
  @Input() APPLICATION_NAME: string;
  @Input() EAI_CATALOG_ID: number;
  @Input() SYSTEM_NATIVE_CODE: string;
  @Input() EAI_ERROR_CODE_ID: number;
  @Input() IS_ERROR: boolean;

  @Input() mode: string;

  @Input() display: boolean;

  @Output() submitFormObj = new EventEmitter<string>();
  @Output() cancelForm = new EventEmitter<void>();
  formErrorService: FormGroup = null;
  loading = true;
  apps_names: string [];
  appNameFilled = true;
  servicesDropdown: SelectItem[];
  errorCodes: string [];
  errorCodesInMem: ErrorCode[];
  serviceSelected: SelectItem;
  ErrorCode = '';

  constructor(private errorServiceService: ErrorServiceService, private catalogService: CatalogService, private errorCodeService: ErrorCodeService) {
  }

  ngOnInit() {
    this.apps_names = [];

    this.errorCodeService.getErrorCodeItems().subscribe(data => {
      this.errorCodesInMem = data;
    });

    this.servicesDropdown = [
      {label: 'Select Service', value: null}
    ];

    this.formErrorService = new FormGroup({
      'APPLICATION_NAME': new FormControl(this.APPLICATION_NAME),
      'SYSTEM_NATIVE_CODE': new FormControl(this.SYSTEM_NATIVE_CODE, Validators.required),
      'Catalog': new FormControl(this.serviceSelected),
      'ErrorCode': new FormControl(this.ErrorCode),
      'IS_ERROR': new FormControl(this.IS_ERROR)

    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.submitFormObj.unsubscribe();
    this.cancelForm.unsubscribe();
  }

  submitForm() {
    const errorService: ErrorService = this.formErrorService.value;
    errorService.IS_ERROR = this.IS_ERROR;
   // errorService.ErrorCode = new ErrorCode();
    /*if (this.formErrorService.value['Catalog']) {
      errorService.Catalog = new Catalog(this.formErrorService.value['Catalog']['EAI_CATALOG_ID']);
    }*/
    if (this.formErrorService.value['ErrorCode'] !== '') {
      // errorService.ErrorCode = new ErrorCode();
      console.log(this.formErrorService.value['ErrorCode']);
      console.log(this.errorCodesInMem.find(d => d.EAI_ERROR_CODE === this.formErrorService.value['ErrorCode']));

      errorService.ErrorCode = this.errorCodesInMem.find(d => d.EAI_ERROR_CODE === this.formErrorService.value['ErrorCode']);
    }

    console.log(errorService);

    if (this.mode === 'edit') {
      this.errorServiceService.updateErrorServiceItem(errorService).subscribe(data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.formErrorService.reset();
      }, error => {
        console.log(error);

      });
    } else {
      this.errorServiceService.addErrorServiceItem(errorService).subscribe(data => {
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

  search(event) {
    this.catalogService.getAppsNames(event.query).subscribe((data: Application[]) => {
      this.apps_names = data.map(d => d.NAME);
    });
  }

  reset() {
    this.appNameFilled = true;
    this.servicesDropdown = [
      {label: 'Select Service', value: null}
    ];
  }

  getServices() {
    this.appNameFilled = false;
    this.catalogService.getCatalogItemsByParams(this.formErrorService.value['APPLICATION_NAME']).subscribe((data: Catalog[]) => {
      data.forEach(d => {
        this.servicesDropdown.push({
          label: d.SERVICE_TYPE + '.' + d.SERVICE_FUNCTION + '.' + d.SERVICE_OPERATION + '.' + d.SERVICE_VERSION,
          value: d
        });
      });
    });
  }

  searchErrorCode(event) {
    let found: ErrorCode[] = [];
    this.errorCodesInMem.forEach(d => {
      console.log(this.errorCodesInMem);
      if (d.EAI_ERROR_CODE.includes(event.query)) {
        found.push(d);
      }
    });
    console.log(found);
    this.errorCodes = found.map(x => x.EAI_ERROR_CODE);
    found = [];

  }

}
