import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Catalog} from '../model/catalog';
import {CatalogService} from './catalog.service';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
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
export class CatalogComponent implements OnInit {

  isLoading: boolean;
  display: boolean;

  items: MenuItem[];
  catalogArray: Catalog[];
  cols: any[];
  receivers: SelectItem[];
  bools: SelectItem[];
  selectedCatalogs: Catalog[] = [];
  selectedCatalog: Catalog = null;

  constructor(private catalogService: CatalogService, public messageService: MessageService) {
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
      {field: 'EAI_CATALOG_ID', header: 'ID'},
      {field: 'APPLICATION_NAME', header: 'Application Name'},
      {field: 'SERVICE_NAME', header: 'Service Name'},
      {field: 'SYSTEM', header: 'System'},
      {field: 'SERVICE_TYPE', header: 'System Type'},
      {field: 'SERVICE_FUNCTION', header: 'System Function'},
      {field: 'SERVICE_OPERATION', header: 'System Operation'},
      {field: 'SERVICE_VERSION', header: 'System Version'},
      {field: 'RECEIVER_TYPE', header: 'Receiver Type'},
      {field: 'RECEIVER_DESTINATION', header: 'Receiver Destination'},
      {field: 'HAS_HANDLING', header: 'Has Handling'},
      {field: 'HAS_SEQUENCE', header: 'Has Sequence'}
    ];

    this.catalogService.getCatalogItems().subscribe((catalog) => {
      this.catalogArray = catalog;
      this.isLoading = false;
    });

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
  }

  onRowSelect(event) {
    if (this.selectedCatalogs.length === 1) {
      this.items[1].disabled = false;
      this.items[2].disabled = false;
    }
    if (this.selectedCatalogs.length > 1) {
      this.items[1].disabled = true;
      this.items[2].disabled = false;
    }
  }

  onRowUnselect(event) {
    if (this.selectedCatalogs.length === 0) {
      this.items[1].disabled = true;
      this.items[2].disabled = true;
    }
    if (this.selectedCatalogs.length === 1) {
      this.items[1].disabled = false;
      this.items[2].disabled = false;
    }
  }

  showModal(catalog) {
    if(catalog != null && catalog != 'selected') {
      this.selectedCatalog = catalog;
    }else if (catalog == 'selected') {
      this.selectedCatalog = this.selectedCatalogs[0];
    }
    this.display = true;
  }

  close() {
    this.selectedCatalogs = [];
    this.selectedCatalog = null;
  }

  submit(event) {
    this.display = false;
    if (event) {
      this.catalogService.getCatalogItems().subscribe((catalog) => {
        this.catalogArray = catalog;
        this.isLoading = false;
        this.addToast('success', 'Catalog', event == 'create'? 'Service added to Catalog': 'Service updated');
      });
    } else {
      this.addToast('error', 'Catalog', 'Something went wrong!');
    }
  }

  clearSelection() {
    this.selectedCatalogs = [];
    this.items[2].disabled = true;
  }

  selectCatalog(catalog: Catalog) {
    // when clicking on view or expand button
    this.selectedCatalogs = [];
  }

  addToast(type: string, message: string, detail: string) {
    this.messageService.add({severity: type, summary: message, detail: detail});
  }

  delete(id) {
    if (id == -1) {
      this.catalogArray.forEach(catalog => {
          if (this.selectedCatalogs.find(selected => selected.EAI_CATALOG_ID === catalog.EAI_CATALOG_ID)) {
            this.catalogService.deleteCatalogItem(catalog.EAI_CATALOG_ID).subscribe(data => {
              this.addToast('success', 'Error code: ' + catalog.EAI_CATALOG_ID + ' deleted with success.', 'Success');
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
    }
  }
}
