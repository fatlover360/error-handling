import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AppComponent} from '../app.component';
import {ScrollPanel} from 'primeng/primeng';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html'
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  model: MenuItem[];

  @ViewChild('scrollPanel') layoutMenuScrollerViewChild: ScrollPanel;

  constructor(public app: AppComponent) { }

  ngAfterViewInit() {
    // setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
  }

  ngOnInit() {
    this.model = [
      {label: 'Control Data', icon: 'pi pi-fw pi-table', routerLink: 'control-data'},
      {label: 'Configuration', icon: 'pi pi-fw pi-cog', routerLink: 'configuration'},
      {label: 'Catalog', icon: 'pi pi-fw pi-list', routerLink: 'catalog'},
      {label: 'Error Code', icon: 'pi pi-fw pi-times', routerLink: 'error-code'},
      {label: 'Error Service', icon: 'pi pi-fw pi-times-circle', routerLink: 'error-service'},
      {label: 'new', icon: 'pi pi-fw pi-times-circle', routerLink: 'catalog/new'}
    ];

  }

}

@Component({
  /* tslint:disable:component-selector */
  selector: '[app-submenu]',
  /* tslint:enable:component-selector */
  template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink" [attr.target]="child.target">
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="fa fa-chevron-down layout-submenu-toggler" *ngIf="child.items"></i>
                </a>
                <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                    [routerLinkActiveOptions]="{exact: true}" [attr.target]="child.target">
                    <span class="menuitem-text">{{child.label}}</span>
                    <i class="fa fa-chevron-down layout-submenu-toggler" *ngIf="child.items"></i>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'"></ul>
            </li>
        </ng-template>
    `,
  animations: [
    trigger('children', [
      state('visible', style({
        height: '*'
      })),
      state('hidden', style({
        height: '0px'
      })),
      transition('visible => hidden', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('600ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppSubMenuComponent {

  @Input() item: MenuItem;

  @Input() root: boolean;

  activeIndex: number;

  hover: boolean;

  constructor(public app: AppComponent, public appMenu: SideMenuComponent) { }

  itemClick(event: Event, item: MenuItem, index: number)  {
    // avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    // activate current item and deactivate active sibling if any
    if (item.routerLink || item.items || item.command || item.url) {
      this.activeIndex = (this.activeIndex as number === index) ? -1 : index;
    }

    // execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    // prevent hash change
    if (item.items || (!item.url && !item.routerLink)) {
      setTimeout(() => {
        this.appMenu.layoutMenuScrollerViewChild.moveBar();
      }, 450);
      event.preventDefault();
    }

    // hide menu
    if (!item.items) {
      this.app.sidebarActive = false;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

}
