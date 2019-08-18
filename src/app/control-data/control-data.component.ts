import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';

import {animate, state, style, transition, trigger} from '@angular/animations';
import {ControlData} from '../model/control-data';
import {ControlDataService} from './control-data.service';

// @ts-ignore
@Component({
  selector: 'app-control-data',
  templateUrl: './control-data.component.html',
  styleUrls: ['./control-data.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class ControlDataComponent implements OnInit {
  isLoading: boolean;
  display: boolean;

  items: MenuItem[];
  controlData: ControlData[];
  cols: any[];
  receivers: SelectItem[];
  bools: SelectItem[];
  selectedDatas: ControlData[] = [];
  selectedData: ControlData = null;

  constructor(private controlDataService: ControlDataService, public messageService: MessageService) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.receivers = [
      {label: 'All', value: null},
      {label: 'JMS', value: 'JMS'},
      {label: 'HTTP', value: 'HTTP'},
      {label: 'SOAP', value: 'SOAP'}
    ];

    this.bools = [
      {label: 'All', value: null},
      {label: 'YES', value: '1'},
      {label: 'NO', value: '0'}
    ];

    this.cols = [
      {field: 'EH_CONTROL_DATA_ID', header: 'ID'},
      {field: 'EAI_CATALOG_ID', header: 'Service'},
      {field: 'EAI_ERROR_CODE', header: 'Error Code'},
      {field: 'EH_RETRY', header: 'Retry'},
      {field: 'EH_STATUS', header: 'Status'},
      {field: 'EH_PUBLISH_DATE', header: 'Publish Date'},
      {field: 'SYSTEM_START_MSG', header: 'Start Message'},
      {field: 'HEADERS', header: 'Headers'},
      {field: 'INSERT_DATETIME', header: 'Insert Date'},
      {field: 'UPDATE_DATETIME', header: 'Update Date'}
    ];

    this.controlDataService.getControlDataItems().subscribe((controlData) => {
      this.controlData = controlData;
      this.isLoading = false;
    });

    this.items = [
      {
        label: 'Republish',
        icon: 'pi pi-fw pi-pencil',
        disabled: true,
        command: event => {
          this.showModal('selected');
        }
      },
      {
        label: 'Clear Selection',
        icon: 'pi pi-fw pi-times',
        command: event => {
          this.clearSelection();
        }
      }
    ];
  }

  onRowSelect(event) {
    if (this.selectedDatas.length > 0) {
      this.items[0].disabled = false;
      this.items[1].disabled = false;
    }
  }

  onRowUnselect(event) {
    if (this.selectedDatas.length === 0) {
      this.items[0].disabled = true;
      this.items[1].disabled = true;
    }
  }

  showModal(catalog) {
    if (catalog != null && catalog !== 'selected') {
      this.selectedData = catalog;
    } else if (catalog === 'selected') {
      this.selectedData = this.selectedDatas[0];
    }
    this.display = true;
  }

  close() {
    this.selectedDatas = [];
    this.selectedData = null;
  }

  submit(event) {
   /* this.display = false;
    if (event) {
      this.controlDataService.getCatalogItems().subscribe((catalog) => {
        this.controlData = catalog;
        this.isLoading = false;
        this.addToast('success', 'Catalog', event === 'create' ? 'Service added to Catalog' : 'Service updated');
      });
    } else {
      this.addToast('error', 'Catalog', 'Something went wrong!');
    }*/
  }

  clearSelection() {
    this.selectedDatas = [];
    this.items[0].disabled = true;
    this.items[1].disabled = true;
  }

  selectCatalog(controlData: ControlData) {
    // when clicking on view or expand button
    this.selectedDatas = [];
  }

  addToast(type: string, message: string, detail: string) {
    this.messageService.add({severity: type, summary: message, detail: detail});
  }

  delete(id) {
  /*  if (id === -1) {
      this.controlData.forEach(catalog => {
          if (this.selectedDatas.find(selected => selected.EAI_CATALOG_ID === catalog.EAI_CATALOG_ID)) {
            this.controlDataService.deleteCatalogItem(catalog.EAI_CATALOG_ID).subscribe(data => {
              this.addToast('success', 'Error code: ' + catalog.EAI_CATALOG_ID + ' deleted with success.', 'Success');
            }, error => {
              this.addToast('error', 'Could not delete this service. This service is referenced in other tables.', 'Error');
            });
          }
        }
      );
    } else {
      this.controlDataService.deleteCatalogItem(id).subscribe(data => {
        this.addToast('success', 'Service with ID: ' + id + ' deleted with success.', 'Success');
      }, error => {
        this.addToast('error', 'Could not delete this service. This service is referenced in other tables.', 'Error');
      });
    }*/
  }
}
