import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DynamicDialogRef, SelectItem} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';

import {CatalogService} from './catalog.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Catalog} from '../model/catalog';


@Component({
  selector: 'app-catalog-form',
  templateUrl: 'catalog-form.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [FormBuilder, DynamicDialogRef, DynamicDialogConfig]
})
export class CatalogFormComponent implements OnInit, OnDestroy {

  @Input() EAI_CATALOG_ID: number;
  @Input() APPLICATION_NAME: string;
  @Input() SYSTEM: string;
  @Input() SERVICE_TYPE: string;
  @Input() SERVICE_NAME: string;
  @Input() SERVICE_FUNCTION: string;
  @Input() SERVICE_OPERATION: string;
  @Input() SERVICE_VERSION: string;
  @Input() RECEIVER_TYPE: string;
  @Input() RECEIVER_DESTINATION: string;
  @Input() HAS_HANDLING: boolean;
  @Input() HAS_SEQUENCE: boolean;

  @Input() mode: string;

  @Input() display: boolean = false;

  @Output() submitFormObj = new EventEmitter<string>();
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
      'SERVICE_NAME': new FormControl(this.SERVICE_NAME, Validators.required),
      'SYSTEM': new FormControl(this.SYSTEM, Validators.required),
      'SERVICE_TYPE': new FormControl(this.SERVICE_TYPE, Validators.required),
      'SERVICE_FUNCTION': new FormControl(this.SERVICE_FUNCTION, Validators.required),
      'SERVICE_OPERATION': new FormControl(this.SERVICE_OPERATION, Validators.required),
      'SERVICE_VERSION': new FormControl(this.SERVICE_VERSION, Validators.required),
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
    let catalog: Catalog = this.formCatalog.value;
    catalog.EAI_CATALOG_ID = this.EAI_CATALOG_ID;
    catalog.HAS_HANDLING = this.HAS_HANDLING;
    catalog.HAS_SEQUENCE = this.HAS_SEQUENCE;
    console.log(this.mode);
    if(this.mode == 'edit'){
      this.catalogService.updateCatalogItem(catalog).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.formCatalog.reset();
      }, error => {
        console.log(error);
      });
    }else {
      this.catalogService.addCatalogItem(catalog).subscribe( data => {
        this.submitFormObj.emit(this.mode);
        this.display = false;
        this.HAS_HANDLING = false;
        this.HAS_SEQUENCE = false;
        this.formCatalog.reset();
      }, error => {
        console.log(error);
      });
    }
  }

  cancel() {
    this.display = false;
    this.formCatalog.reset();
  }

  hasHandling() {
    this.HAS_HANDLING = !this.HAS_HANDLING
  }

  hasSequence() {
    this.HAS_SEQUENCE = !this.HAS_SEQUENCE
  }
}
