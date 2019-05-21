import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Catalog} from '../model/catalog';
import {CatalogService} from './catalog.service';
import {DialogService, DynamicDialogConfig, MenuItem, MessageService} from 'primeng/api';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [DialogService, DynamicDialogConfig],
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
  selectedCatalogs: Catalog[];

  constructor(private catalogService: CatalogService, public dialogService: DialogService, public messageService: MessageService) {
  }

  ngOnInit() {
    this.catalogService.getTest().subscribe( data => console.log(data));


    this.isLoading = true;
    this.cols = [
      {field: 'EAI_CATALOG_ID', header: 'ID'},
      {field: 'APPLICATION_NAME', header: 'Application Name'},
      {field: 'SYSTEM', header: 'System'},
      {field: 'SYSTEM_TYPE', header: 'System Type'},
      {field: 'SYSTEM_FUNCTION', header: 'System Function'},
      {field: 'SYSTEM_OPERATION', header: 'System Operation'},
      {field: 'SYSTEM_VERSION', header: 'System Version'},
      {field: 'RECEIVER_TYPE', header: 'Receiver Type'},
      {field: 'RECEIVER_DESTINATION', header: 'Receiver Destination'},
      {field: 'HAS_HANDLING', header: 'Has Handling'},
      {field: 'HAS_SEQUENCE', header: 'Has Sequence'}
    ];
    this.catalogService.getCatalogItems().subscribe((catalog: Catalog[]) => {
      this.catalogArray = catalog;
      this.isLoading = false;
    });

    this.items = [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: event => {
         // this.show();
        }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        disabled: true
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        disabled: true,
        command: event => {
          this.delete();
        }
      },
      {
        label: 'Clear Selection',
        icon: 'pi pi-fw pi-times',
        command: event => {
          this.clearSelection();
        }
      },
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: event => {
          this.showModal(true);
        }
      },
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


  showModal(event) {
    console.log(event);
    this.display = true;
  }

  submit(event) {
    this.display = false;
    if(event) {
      this.addToast('success', 'Catalog', 'Catalog Item Added!');
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

  addToast(type: string, message: string, detail: string ) {
    this.messageService.add({severity: type, summary: message, detail: detail});
  }

  delete() {
    this.catalogArray.forEach(catalog => {
        if (this.selectedCatalogs.find(selected => selected.EAI_CATALOG_ID === catalog.EAI_CATALOG_ID)) {
          this.catalogArray.splice(this.catalogArray.indexOf(catalog), 1);
          this.selectedCatalogs.splice(this.selectedCatalogs.indexOf(catalog), 1);
        }
      }
    );
  }
}
