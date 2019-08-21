import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';
import {ControlSequence} from '../model/control-sequence';
import {ControlSequenceService} from './control-sequence.service';

@Component({
  selector: 'app-control-sequence',
  templateUrl: './control-sequence.component.html',
  styleUrls: ['./control-sequence.component.css', '../app.component.css'],
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

export class ControlSequenceComponent implements OnInit {
  isLoading: boolean;
  display: boolean;
  items: MenuItem[];
  controlSequenceArray: ControlSequence[];
  cols: any[];

  selectedControlSequences: ControlSequence[] = [];

  constructor(private controlSequenceService: ControlSequenceService, public messageService: MessageService) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.cols = [
      {field: 'EH_CONTROL_SEQUENCE_ID', header: 'Sequence Id'},
      {field: 'EAI_CATALOG_ID', header: 'Catalog'},
      {field: 'SEQUENCE_KEY', header: 'Sequence Key'},
      {field: 'INSERT_DATETIME', header: 'Insert Date'},
      {field: 'UPDATE_DATETIME', header: 'Update Date'}
    ];

    this.items = [
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

    this.items[0].disabled = true;
    this.items[1].disabled = true;

    this.controlSequenceService.getControlSequences().subscribe(data => {
      if (data) {
        this.controlSequenceArray = data;
      } else {
        this.controlSequenceArray = [];
      }

      this.isLoading = false;
    });
  }

  onRowSelect(event) {

    if (this.selectedControlSequences.length > 0) {
      this.items[0].disabled = false;
      this.items[1].disabled = false;
    }
  }

  onRowUnselect(event) {
    if (this.selectedControlSequences.length === 0) {
      this.items[0].disabled = true;
      this.items[1].disabled = true;
    }
  }

  clearSelection() {
    this.selectedControlSequences = [];
    this.items[0].disabled = true;
    this.items[1].disabled = true;
  }

  selectSequence(controlSequence: ControlSequence) {
    // when clicking on view or expand button
    this.selectedControlSequences = [];
  }

  addToast(type: string, message: string, detail: string) {
    this.messageService.add({severity: type, summary: message, detail: detail});
  }

  delete(id) {
    this.isLoading = true;
    if (id == -1) {
      this.controlSequenceArray.forEach(controlSeq => {
          if (this.selectedControlSequences.find(selected => selected.EH_CONTROL_SEQUENCE_ID === controlSeq.EH_CONTROL_SEQUENCE_ID)) {
            this.controlSequenceService.deleteControlSequence(controlSeq.EH_CONTROL_SEQUENCE_ID).subscribe(data => {
              this.controlSequenceService.getControlSequences().subscribe((seqs) => {
                this.controlSequenceArray = seqs;
                this.isLoading = false;
                this.addToast('success', 'Sequence Key deleted with success.', 'Success');
              });
            }, error => {
              this.addToast('error', "Could not delete this sequence.", 'Error');
            });
          }
        }
      );
    } else {
      this.controlSequenceService.deleteControlSequence(id).subscribe(data => {
        this.controlSequenceService.getControlSequences().subscribe((seqs) => {
          this.controlSequenceArray = seqs;
          this.isLoading = false;
          this.addToast('success', 'Sequence Key deleted with success.', 'Success');
        }, error => {
          this.addToast('error', "Could not delete this error code, because it's referenced in other tables.", 'Error');
        });
      })
    }
  }
}
