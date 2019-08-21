import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicDialogRef, SelectItem} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from './configuration.service';
import {Configuration} from '../model/configuration';
import {ErrorCode} from '../model/error-code';

@Component({
  selector: 'app-configuration-form',
  templateUrl: 'configuration-form.component.html',
  styleUrls: ['./configuration.component.css'],
  providers: [FormBuilder, DynamicDialogRef, DynamicDialogConfig]
})
export class ConfigurationFormComponent implements OnInit, OnDestroy {
  @Input() ErrorCode: ErrorCode;
  @Input() APPLICATION_NAME: string;
  @Input() EAI_CATALOG_ID: number;
  @Input() EAI_ERROR_CODE_ID: string;
  @Input() MAX_RETRY: string;
  @Input() WAIT_TIME_SECS: boolean;
  @Input() DELTA_TIME_SECS: string;
  @Input() DELTA_TIME_PERCENTAGE: string;

  @Input() mode: string;

  @Input() display: boolean;

  @Output() submitFormObj = new EventEmitter<string>();
  @Output() cancelForm = new EventEmitter<void>();
  formConfiguration: FormGroup = null;
  loading = true;
  serviceSelected: SelectItem;

  constructor(private configurationService: ConfigurationService) {
  }

  ngOnInit() {

    this.formConfiguration = new FormGroup({
      'APPLICATION_NAME': new FormControl(this.APPLICATION_NAME, Validators.required),
      'Catalog': new FormControl(this.serviceSelected, Validators.required),
      'ErrorCode': new FormControl(this.ErrorCode, Validators.required),
      'MAX_RETRY': new FormControl(this.MAX_RETRY, Validators.required),
      'WAIT_TIME_SECS': new FormControl(this.WAIT_TIME_SECS, Validators.required),
      'DELTA_TIME_SECS': new FormControl(this.DELTA_TIME_SECS, Validators.required),
      'DELTA_TIME_PERCENTAGE': new FormControl(this.DELTA_TIME_PERCENTAGE, Validators.required)
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.submitFormObj.unsubscribe();
    this.cancelForm.unsubscribe();
  }

  submitForm() {

    /*const configuration: Configuration = this.formConfiguration.value;

    console.log(this.mode);
    if (this.mode === 'edit') {
      this.configurationService.updateConfigurationItem(configuration).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.formConfiguration.reset();
      }, error => {
        console.log(error);
      });
    } else {
      this.configurationService.addConfigurationItem(configuration).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.formConfiguration.reset();
      }, error => {
        console.log(error);
      });
    }*/
  }

  cancel() {
    this.display = false;
    this.formConfiguration.reset();
  }
}
