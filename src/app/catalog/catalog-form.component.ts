import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DialogService, DynamicDialogRef, MessageService, SelectItem} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import {Catalog} from '../model/catalog';
import {CatalogService} from './catalog.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogResponse} from '../model/dialog-response.domain';

@Component({
  selector: 'app-catalog-form',
  templateUrl: 'catalog-form.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [FormBuilder, DynamicDialogRef, DynamicDialogConfig]
})
export class CatalogFormComponent implements OnInit, OnDestroy {
  @Input() APPLICATION_NAME: string;
  @Input() SYSTEM: string;
  @Input() SYSTEM_TYPE: string;
  @Input() SYSTEM_FUNCTION: string;
  @Input() SYSTEM_OPERATION: string;
  @Input() SYSTEM_VERSION: string;
  @Input() RECEIVER_TYPE: string;
  @Input() RECEIVER_DESTINATION: string;
  @Input() HAS_HANDLING: boolean;
  @Input() HAS_SEQUENCE: boolean;

  @Input() display: boolean = false;

  @Output() submitFormObj = new EventEmitter<boolean>();
  @Output() cancelForm = new EventEmitter<void>();
  formCatalog: FormGroup = null;
  loading = true;
  booleans: SelectItem[];

  constructor(private catalogService: CatalogService) {
  }

  ngOnInit() {
    this.HAS_HANDLING = false;
    this.HAS_SEQUENCE = false;
    this.booleans = [];
    this.booleans.push({label: 'Select Value', value: ''});
    this.booleans.push({label: 'HTTP', value: 'HTTP'});
    this.booleans.push({label: 'SOAP', value: 'SOAP'});
    this.booleans.push({label: 'JMS', value: 'JMS'});

    this.formCatalog = new FormGroup({
      'APPLICATION_NAME': new FormControl(this.APPLICATION_NAME, Validators.required),
      'SYSTEM': new FormControl(this.SYSTEM, Validators.required),
      'SYSTEM_TYPE': new FormControl(this.SYSTEM_TYPE, Validators.required),
      'SYSTEM_FUNCTION': new FormControl(this.SYSTEM_FUNCTION, Validators.required),
      'SYSTEM_OPERATION': new FormControl(this.SYSTEM_OPERATION, Validators.required),
      'SYSTEM_VERSION': new FormControl(this.SYSTEM_VERSION, Validators.required),
      'RECEIVER_TYPE': new FormControl(this.RECEIVER_TYPE, Validators.required),
      'RECEIVER_DESTINATION': new FormControl(this.RECEIVER_DESTINATION, Validators.required),
      'HAS_HANDLING': new FormControl(this.HAS_HANDLING),
      'HAS_SEQUENCE': new FormControl(this.HAS_SEQUENCE)
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.submitFormObj.unsubscribe();
    this.cancelForm.unsubscribe();
  }

  submitForm() {
    this.display = false;
   /* this.catalogService.addCatalogItem(this.formCatalog.value).then( data => {
      console.log(data);
      this.submitFormObj.emit(true);
      this.formCatalog.reset();
    });*/
    this.submitFormObj.emit(true);
    this.formCatalog.reset();

  }

  cancel() {
    this.display = false;
    this.formCatalog.reset();
  }
}
