import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ErrorCode} from '../model/error-code';
import {ErrorCodeService} from './error-code.service';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-error-code',
  templateUrl: './error-code.component.html',
  styleUrls: ['./error-code.component.css'],
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
export class ErrorCodeComponent implements OnInit {
  isLoading: boolean;
  display: boolean;
  items: MenuItem[];
  errorCodeArray: ErrorCode[];
  cols: any[];

  bools: SelectItem[];
  selectedErrorCodes: ErrorCode[] = [];
  selectedErrorCode: ErrorCode = null;

  constructor(private errorCodeService: ErrorCodeService,  public messageService: MessageService) { }

  ngOnInit() {
    this.isLoading = true;

    this.cols = [
      {field: 'EAI_ERROR_CODE_ID', header: 'ID'},
      {field: 'EAI_ERROR_CODE', header: 'Code'},
      {field: 'EAI_ERROR_CODE_DESC', header: 'Description'},
      {field: 'IS_ERROR', header: 'Is Error'}
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

    this.errorCodeService.getErrorCodeItems().subscribe(data => {
      console.log(data);
      this.errorCodeArray = data;
      this.isLoading = false;
    });
  }

  onRowSelect(event) {
    if (this.selectedErrorCodes.length === 1) {
      this.items[1].disabled = false;
      this.items[2].disabled = false;
    }
    if (this.selectedErrorCodes.length > 1) {
      this.items[1].disabled = true;
      this.items[2].disabled = false;
    }
  }

  onRowUnselect(event) {
    if (this.selectedErrorCodes.length === 0) {
      this.items[1].disabled = true;
      this.items[2].disabled = true;
    }
    if (this.selectedErrorCodes.length === 1) {
      this.items[1].disabled = false;
      this.items[2].disabled = false;
    }
  }

  showModal(catalog) {
    if(catalog != null && catalog != 'selected') {
      this.selectedErrorCode = catalog;
    }else if (catalog == 'selected') {
      this.selectedErrorCode = this.selectedErrorCodes[0];
    }
    this.display = true;
  }

  close() {
    this.selectedErrorCodes = [];
    this.selectedErrorCode = null;
  }

  submit(event) {
    this.display = false;
    if (event) {
      this.errorCodeService.getErrorCodeItems().subscribe((errorcode) => {
        this.errorCodeArray = errorcode;
        this.isLoading = false;
        this.addToast('success', 'Error Code', event == 'create'? 'Error Code added': 'Error Code updated');
      });
    } else {
      this.addToast('error', 'Error Code', 'Something went wrong!');
    }
  }

  clearSelection() {
    this.selectedErrorCodes = [];
    this.items[2].disabled = true;
  }

  selectErrorCode(errorCode: ErrorCode) {
    // when clicking on view or expand button
    this.selectedErrorCodes = [];
  }

  addToast(type: string, message: string, detail: string) {
    this.messageService.add({severity: type, summary: message, detail: detail});
  }

  delete(id) {
   /* if (id == -1) {
      this.errorCodeArray.forEach(catalog => {
          if (this.selectedCatalogs.find(selected => selected.EAI_CATALOG_ID === catalog.EAI_CATALOG_ID)) {
            this.catalogService.deleteCatalogItem(catalog.EAI_CATALOG_ID).subscribe(data => {
              this.addToast('success', 'Service with ID: ' + catalog.EAI_CATALOG_ID + ' deleted with success.', 'Success');
            }, error => {
              this.addToast('error', 'Could not delete this service. This service is referenced in other tables.', 'Error');
            });
          }
        }
      );
    } else {
      this.catalogService.deleteCatalogItem(id).subscribe(data => {
        this.addToast('success', 'Service with ID: ' + id + ' deleted with success.', 'Success');
      }, error => {
        this.addToast('error', 'Could not delete this service. This service is referenced in other tables.', 'Error');
      });
    }*/
  }

}
