import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';

import {animate, state, style, transition, trigger} from '@angular/animations';
import {ControlData} from '../model/control-data';
import {ControlDataService} from './control-data.service';
import {ControlDataUpd} from '../model/control-data-upd';
import {Catalog} from '../model/catalog';
import {Application} from '../model/app';
import {CatalogService} from '../catalog/catalog.service';

@Component({
  selector: 'app-control-data',
  templateUrl: './control-data.component.html',
  styleUrls: ['./control-data.component.css', '../app.component.css'],
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
  xml: string;
  apps_names: string [];

  // params
  fromDate: Date = new Date();
  toDate: Date = new Date();
  TRANSACTION_ID = '';
  APPLICATION_NAME = '';
  ERROR_CODE = '';
  STATUS = '';

  constructor(private controlDataService: ControlDataService, public messageService: MessageService,
              public catalogService: CatalogService) {
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
      {field: 'Catalog', subfield: 'APPLICATION_NAME', header: 'Application Name', display: 'table-cell'},
      {field: 'SERVICE_NAME', header: 'Service Name'},
      {field: 'EAI_ERROR_CODE', header: 'Error Code'},
      {field: 'EH_RETRY', header: 'Retry'},
      {field: 'EH_STATUS', header: 'Status'},
      {field: 'EH_PUBLISH_DATE', header: 'Publish Date'},
      {field: 'SERVICE_START_MSG', header: 'Start Message'},
      {field: 'HEADERS', header: 'Headers'},
      {field: 'INSERT_DATETIME', header: 'Insert Date'},
      {field: 'UPDATE_DATETIME', header: 'Update Date'}
    ];

    this.items = [
      {
        label: 'Republish',
        icon: 'pi pi-fw pi-pencil',
        disabled: true,
        command: event => {
          // this.showModal('selected');
          this.republish();
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

    this.getControlData();
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

  showModal(controlData, xml) {
    this.xml = xml;
    if (controlData != null && controlData !== 'selected') {
      this.selectedData = controlData;
    } else if (controlData === 'selected') {
      this.selectedData = this.selectedDatas[0];
    }
    this.display = true;
  }

  close() {
    this.selectedDatas = [];
    this.selectedData = null;
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

  republish() {
    this.isLoading = true;
    const array: ControlDataUpd = new ControlDataUpd();
    array.ControlData = this.selectedDatas;
    this.controlDataService.republish(array).subscribe(data => {
      this.controlDataService.getControlDataItems(this.TRANSACTION_ID, this.ERROR_CODE, this.STATUS, this.APPLICATION_NAME,
        this.fromDate.getUTCFullYear() + '/' + (this.fromDate.getUTCMonth() + 1) + '/' + (this.fromDate.getUTCDate() + 1),
        this.toDate.getUTCFullYear() + '/' + (this.toDate.getUTCMonth() + 1) + '/' + (this.fromDate.getUTCDate() + 1))
        .subscribe((controlData) => {
          this.controlData = controlData;
          this.close();
          this.clearSelection();
          this.isLoading = false;
          this.addToast('success', 'Messages republished.', 'Control Data');
        });
    }, error1 => {
      alert();
      console.log(error1);
    });
  }

  search(event) {
    this.catalogService.getAppsNames(event.query).subscribe((data: Application[]) => {
      if (data) {
        this.apps_names = data.map(d => d.NAME);
      }
    });
  }

  getControlData() {
    this.isLoading = true;
    console.log(this.fromDate);
    console.log(this.toDate);
    let from_date = '';
    let to_date = '';
    if (this.fromDate !== null) {
      const monthFromDate = (this.fromDate.getUTCMonth() + 1).toString();
      const daymonthFromDate = (this.fromDate.getUTCDate() + 1).toString();
       from_date = this.fromDate.getUTCFullYear() + '/' + (monthFromDate.length > 1 ? monthFromDate : '0' + monthFromDate)
        + '/' + (daymonthFromDate.length > 1 ? daymonthFromDate : '0' + daymonthFromDate);
    }

    if (this.toDate !== null ) {
      const monthToDate = (this.toDate.getUTCMonth() + 1).toString();
      const daymonthToDate = (this.toDate.getUTCDate() + 1).toString();
      to_date = this.toDate.getUTCFullYear() + '/' + (monthToDate.length > 1 ? monthToDate : '0' + monthToDate) + '/'
        + (daymonthToDate.length > 1 ? daymonthToDate : '0' + daymonthToDate);

    }
    this.controlDataService.getControlDataItems(this.TRANSACTION_ID, this.ERROR_CODE, this.STATUS, this.APPLICATION_NAME,
      from_date,
      to_date)
      .subscribe((controlData) => {
        if (controlData) {
          this.controlData = controlData;
        } else {
          this.controlData = [];
        }

        this.isLoading = false;
      });

  }

}
