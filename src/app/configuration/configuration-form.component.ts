import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicDialogRef, SelectItem} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from './configuration.service';
import {ErrorCode} from '../model/error-code';
import {CatalogService} from '../catalog/catalog.service';
import {ErrorCodeService} from '../error-code/error-code.service';
import {Catalog} from '../model/catalog';
import {Application} from '../model/app';
import {Configuration} from '../model/configuration';

@Component({
  selector: 'app-configuration-form',
  templateUrl: 'configuration-form.component.html',
  styleUrls: ['./configuration.component.css'],
  providers: [FormBuilder, DynamicDialogRef, DynamicDialogConfig]
})
export class ConfigurationFormComponent implements OnInit, OnDestroy {
  @Input() ErrorCode: ErrorCode;
  @Input() Catalog: Catalog;
  @Input() APPLICATION_NAME: string;
  @Input() EAI_CATALOG_ID: number;
  @Input() EAI_ERROR_CODE_ID: string;
  @Input() MAX_RETRIES: string;
  @Input() WAIT_TIME_SECS: boolean;
  @Input() DELTA_TIME_SECS: string;
  @Input() DELTA_PERCENTAGE: string;
  @Input() Configuration: Configuration;

  @Input() mode: string;

  @Input() display: boolean;

  @Output() submitFormObj = new EventEmitter<string>();
  @Output() cancelForm = new EventEmitter<void>();
  formConfiguration: FormGroup = null;
  loading = true;
  serviceSelected: SelectItem;
  apps_names: string [];
  appNameFilled = true;
  servicesDropdown: SelectItem[];
  errorCodes: string [];
  errorCodesInMem: ErrorCode[];

  constructor(private configurationService: ConfigurationService,  private catalogService: CatalogService, private errorCodeService: ErrorCodeService) {
  }

  ngOnInit() {
    this.apps_names = [];

    this.errorCodeService.getErrorCodeItems().subscribe(data => {
      this.errorCodesInMem = data;
    });

    this.servicesDropdown = [
      {label: 'Select Service', value: null}
    ];

    this.setForm();

    if (this.mode === 'edit') {
      this.getServices(this.Configuration.Catalog.APPLICATION_NAME);
    }

    this.loading = false;



    this.loading = false;
  }

  ngOnDestroy() {
    this.submitFormObj.unsubscribe();
    this.cancelForm.unsubscribe();
  }

  submitForm() {
    const configurationToSubmit: Configuration = this.formConfiguration.value;
    // errorService.IS_ERROR = this.IS_ERROR;

    if (this.formConfiguration.value['ErrorCode'] !== '') {
      configurationToSubmit.ErrorCode = this.errorCodesInMem.find(d => d.EAI_ERROR_CODE === this.formConfiguration.value['ErrorCode']);
    }

    if (this.mode === 'edit') {
      delete configurationToSubmit.APPLICATION_NAME;

      this.configurationService.updateConfigurationItem(configurationToSubmit, this.Configuration).subscribe(data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.formConfiguration.reset();
        this.reset();
      }, error => {
        console.log(error);

      });
    } else {
      if (configurationToSubmit.Catalog == null) {
        delete  configurationToSubmit.Catalog;
      }

      if (configurationToSubmit.ErrorCode === '') {
        delete  configurationToSubmit.ErrorCode;
      }

      delete configurationToSubmit.APPLICATION_NAME;

      this.configurationService.addConfigurationItem(configurationToSubmit).subscribe(data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.formConfiguration.reset();
        this.reset();
      }, error => {
        console.log(error);
      });
    }
  }

  cancel() {
    this.display = false;
    this.formConfiguration.reset();
    this.reset();
  }

  setForm() {

    if (this.mode !== 'edit') {
      this.formConfiguration = new FormGroup({
        'APPLICATION_NAME': new FormControl(this.APPLICATION_NAME, Validators.required),
        'Catalog': new FormControl(this.serviceSelected, Validators.required),
        'ErrorCode': new FormControl(this.ErrorCode, Validators.required),
        'MAX_RETRIES': new FormControl(this.MAX_RETRIES, Validators.required),
        'WAIT_TIME_SECS': new FormControl(this.WAIT_TIME_SECS, Validators.required),
        'DELTA_TIME_SECS': new FormControl(this.DELTA_TIME_SECS, Validators.required),
        'DELTA_PERCENTAGE': new FormControl(this.DELTA_PERCENTAGE, Validators.required)
      });
    } else {
      this.formConfiguration = new FormGroup({
        'APPLICATION_NAME': new FormControl(this.Configuration.Catalog.APPLICATION_NAME, Validators.required),
        'Catalog': new FormControl(this.serviceSelected, Validators.required),
        'ErrorCode': new FormControl(this.Configuration.ErrorCode.EAI_ERROR_CODE, Validators.required),
        'MAX_RETRIES': new FormControl(this.Configuration.MAX_RETRIES, Validators.required),
        'WAIT_TIME_SECS': new FormControl(this.Configuration.WAIT_TIME_SECS, Validators.required),
        'DELTA_TIME_SECS': new FormControl(this.Configuration.DELTA_TIME_SECS, Validators.required),
        'DELTA_PERCENTAGE': new FormControl(this.Configuration.DELTA_PERCENTAGE, Validators.required)
      });
    }

  }
  getServices(appname) {
    this.appNameFilled = false;
    this.catalogService.getCatalogItemsByParams(this.mode === 'edit' ? appname : this.formConfiguration.value['APPLICATION_NAME']).subscribe((data: Catalog[]) => {
      data.forEach(d => {
        this.servicesDropdown.push({
          label: d.SERVICE_TYPE + '.' + d.SERVICE_FUNCTION + '.' + d.SERVICE_OPERATION + '.' + d.SERVICE_VERSION,
          value: d
        });
      });

      if ( this.mode === 'edit') {
        this.servicesDropdown.forEach( x => {
          if ( x.value !== null)  {
            if (x.value['EAI_CATALOG_ID'] === this.Configuration.Catalog.EAI_CATALOG_ID) {
              this.serviceSelected = x.value;
            }
          }
        });
        this.setForm();
      }
    });
  }

  search(event) {
    this.servicesDropdown = [
      {label: 'Select Service', value: null}
    ];
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

  searchErrorCode(event) {
    let found: ErrorCode[] = [];
    this.errorCodesInMem.forEach(d => {
      if (d.EAI_ERROR_CODE.includes(event.query)) {
        found.push(d);
      }
    });
    this.errorCodes = found.map(x => x.EAI_ERROR_CODE);
    found = [];

  }

}
