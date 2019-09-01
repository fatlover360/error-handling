import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Configuration} from '../model/configuration';
import {ConfigurationService} from './configuration.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';
import {ErrorCode} from '../model/error-code';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css', '../app.component.css'],
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
export class ConfigurationComponent implements OnInit {
  isLoading: boolean;
  display: boolean;
  items: MenuItem[];
  configurationArray: Configuration[];
  cols: any[];

  bools: SelectItem[];
  selectedConfigurations: Configuration[] = [];
  selectedConfiguration: Configuration = null;

  constructor(private configurationService: ConfigurationService,  public messageService: MessageService) { }

  ngOnInit() {
    this.isLoading = true;

    this.cols = [
      {field: 'ID', header: '#Id', display: 'none'},
      {field: 'SERVICE_NAME', header: 'Service', display: 'table-cell'},
      {field: 'ErrorCode', subfield: 'EAI_ERROR_CODE', header: 'Error Code', display: 'table-cell'},
      {field: 'MAX_RETRIES', header: 'Max Retries', display: 'table-cell'},
      {field: 'WAIT_TIME_SECS', header: 'Wait Time (seconds)', display: 'table-cell'},
      {field: 'DELTA_TIME_SECS', header: 'Delta Time (seconds)', display: 'table-cell'},
      {field: 'DELTA_PERCENTAGE', header: 'Delta Time (%)', display: 'table-cell'}
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

    this.configurationService.getConfigurationItems().subscribe(data => {
      console.log(data);
      this.configurationArray = data;
      this.isLoading = false;
    });
  }

  onRowSelect(event) {
    if (this.selectedConfigurations.length === 1) {
      this.items[1].disabled = false;
      this.items[2].disabled = false;
    }
    if (this.selectedConfigurations.length > 1) {
      this.items[1].disabled = true;
      this.items[2].disabled = false;
    }
  }

  onRowUnselect(event) {
    if (this.selectedConfigurations.length === 0) {
      this.items[1].disabled = true;
      this.items[2].disabled = true;
    }
    if (this.selectedConfigurations.length === 1) {
      this.items[1].disabled = false;
      this.items[2].disabled = false;
    }
  }

  showModal(configuration) {
    if (configuration != null && configuration != 'selected') {
      this.selectedConfiguration = configuration;
    } else if (configuration == 'selected') {
      this.selectedConfiguration = this.selectedConfigurations[0];
    }
    this.display = true;
  }

  close() {
    this.selectedConfigurations = [];
    this.selectedConfiguration = null;
  }

  submit(event) {
    this.display = false;
    if (event) {
      this.configurationService.getConfigurationItems().subscribe((configuration) => {
        this.configurationArray = configuration;
        this.isLoading = false;
        this.addToast('success', 'Error Configuration', event == 'create' ? 'Error Configuration added' : 'Error Configuration updated');
      });
    } else {
      this.addToast('error', 'Error Configuration', 'Something went wrong!');
    }
  }

  clearSelection() {
    this.selectedConfigurations = [];
    this.items[2].disabled = true;
  }

  selectErrorCode(configuration: Configuration) {
    // when clicking on view or expand button
    this.selectedConfigurations = [];
  }

  addToast(type: string, message: string, detail: string) {
    this.messageService.add({severity: type, summary: message, detail: detail});
  }

  delete(id) {
    if (id === -1) {
      this.configurationArray.forEach(configuration => {
          if (this.selectedConfigurations.find(selected => selected.EAI_ERROR_CODE_ID === configuration.EAI_ERROR_CODE_ID)) {
            this.configurationService.deleteConfigurationItem(configuration.EAI_ERROR_CODE_ID).subscribe(data => {
              this.configurationService.getConfigurationItems().subscribe((conf) => {
                this.configurationArray = conf;
                this.isLoading = false;
                this.addToast('success', 'Configuration : ' + configuration.EAI_ERROR_CODE_ID + ' deleted with success.', 'Success');
              });
            }, error => {
              this.addToast('error', 'Could not delete this configuration.', 'Error');
            });
          }
        }
      );
    } else {
      this.configurationService.deleteConfigurationItem(id).subscribe(data => {
        this.configurationService.getConfigurationItems().subscribe((errorcode) => {
          this.configurationArray = errorcode;
          this.isLoading = false;
          this.addToast('success', 'Configuration : ' + errorcode.EAI_ERROR_CODE_ID + ' deleted with success.', 'Success');
        }, error => {
          this.addToast('error', 'Could not delete this configuration.', 'Error');
        });
      })
    }
  }

}
