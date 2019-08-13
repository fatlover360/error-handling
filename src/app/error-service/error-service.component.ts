import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ErrorService} from '../model/error-service';
import {ErrorServiceService} from './error-service.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-error-service',
  templateUrl: './error-service.component.html',
  styleUrls: ['./error-service.component.css'],
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
export class ErrorServiceComponent implements OnInit {

  isLoading: boolean;
  display: boolean;
  items: MenuItem[];
  errorServiceArray: ErrorService[];
  cols: any[];

  bools: SelectItem[];
  selectedErrorServices: ErrorService[] = [];
  selectedErrorService: ErrorService = null;

  constructor(private errorServiceService: ErrorServiceService, public messageService: MessageService) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.cols = [
      {field: 'ID', header: '#', display: 'none'},
      {field: 'APPLICATION_NAME', header: 'Application', display: 'table-cell'},
      {field: 'Catalog', subfield: 'SERVICE_TYPE', header: 'Service Type', display: 'table-cell'},
      {field: 'Catalog', subfield: 'SERVICE_NAME', header: 'Service Name', display: 'table-cell'},
      {field: 'Catalog', subfield: 'SERVICE_FUNCTION', header: 'Service Function', display: 'table-cell'},
      {field: 'Catalog', subfield: 'SERVICE_OPERATION', header: 'Service Operation', display: 'table-cell'},
      {field: 'Catalog', subfield: 'SERVICE_VERSION', header: 'Service Version', display: 'table-cell'},
      {field: 'SYSTEM_NATIVE_CODE', header: 'Native Code', display: 'table-cell'},
      {field: 'ErrorCode', subfield: 'EAI_ERROR_CODE', header: 'Error Code', display: 'table-cell'},
      {field: 'ErrorCode', subfield: 'EAI_ERROR_CODE_DESC', header: 'Error Code Desc.', display: 'table-cell'},
      {field: 'IS_ERROR', header: 'Is Error', display: 'table-cell'}
    ];

    this.items = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: event => {
          this.showModal(null);
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        disabled: true,
        command: event => {
          this.showModal('selected');
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        disabled: true,
        command: event => {
          this.delete(-1);
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

    this.errorServiceService.getErrorServiceItems().subscribe(data => {
      console.log(data);
      this.errorServiceArray = data;
      this.isLoading = false;
    });
  }

  onRowSelect(event) {
    if (this.selectedErrorServices.length === 1) {
      this.items[1].disabled = false;
      this.items[2].disabled = false;
    }
    if (this.selectedErrorServices.length > 1) {
      this.items[1].disabled = true;
      this.items[2].disabled = false;
    }
  }

  onRowUnselect(event) {
    if (this.selectedErrorServices.length === 0) {
      this.items[1].disabled = true;
      this.items[2].disabled = true;
    }
    if (this.selectedErrorServices.length === 1) {
      this.items[1].disabled = false;
      this.items[2].disabled = false;
    }
  }

  showModal(errorservice) {
    if (errorservice != null && errorservice !== 'selected') {
      this.selectedErrorService = errorservice;
    } else if (errorservice === 'selected') {
      this.selectedErrorService = this.selectedErrorServices[0];
    }
    this.display = true;
  }

  close() {
    this.selectedErrorServices = [];
    this.selectedErrorService = null;
  }

  submit(event) {
    this.display = false;
    if (event) {
      this.errorServiceService.getErrorServiceItems().subscribe((errorcode) => {
        this.errorServiceArray = errorcode;
        this.isLoading = false;
        this.addToast('success', 'Error Code', event == 'create' ? 'Error Code added' : 'Error Code updated');
      });
    } else {
      this.addToast('error', 'Error Code', 'Something went wrong!');
    }
  }

  clearSelection() {
    this.selectedErrorServices = [];
    this.items[2].disabled = true;
  }

  selectErrorService(errorService: ErrorService) {
    // when clicking on view or expand button
    this.selectedErrorServices = [];
  }

  addToast(type: string, message: string, detail: string) {
    this.messageService.add({severity: type, summary: message, detail: detail});
  }

  delete(id) {
    if (id === -1) {
      this.errorServiceArray.forEach(errorService => {
          if (this.selectedErrorServices.find(selected =>
            selected === errorService)) {
            this.errorServiceService.deleteErrorServiceItem(errorService.ErrorCode.EAI_ERROR_CODE_ID, errorService.Catalog.EAI_CATALOG_ID).subscribe(data => {
              this.errorServiceService.getErrorServiceItems().subscribe((errorServiceData) => {
                this.errorServiceArray = errorServiceData;
                this.isLoading = false;
                this.addToast('success', 'Error Service : ' + errorService.ErrorCode.EAI_ERROR_CODE_ID + ' deleted with success.', 'Success');
              });
            }, error => {
              this.addToast('error', 'Could not delete this error, because it\'s referenced in other tables.', 'Error');

            });
          }
        }
      );
    } else {
      /*this.errorServiceService.deleteErrorServiceItem(id).subscribe(data => {
        this.errorServiceService.getErrorServiceItems().subscribe((errorcode) => {
          this.errorServiceArray = errorcode;
          this.isLoading = false;
          this.addToast('success', 'Error Service : ' + errorcode.EAI_ERROR_SERVICE_ID + ' deleted with success.', 'Success');
        }, error => {
          this.addToast('error', 'Could not delete this error, because it\'s referenced in other tables.', 'Error');
        });
      });*/
    }
  }

}
