import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlDataComponent } from './control-data/control-data.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ErrorCodeComponent } from './error-code/error-code.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ErrorServiceComponent } from './error-service/error-service.component';
import { MenuComponent } from './menu/menu.component';
import {AppSubMenuComponent, SideMenuComponent} from './side-menu/side-menu.component';
import {MenuModule} from 'primeng/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TableModule} from 'primeng/table';
import {ControlDataService} from './control-data/control-data.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CatalogService} from './catalog/catalog.service';
import {ConfigurationService} from './configuration/configuration.service';
import {ErrorCodeService} from './error-code/error-code.service';
import {ErrorServiceService} from './error-service/error-service.service';
import {PaginatorModule} from 'primeng/paginator';
import {
  ButtonModule, CheckboxModule, ContextMenuModule, DropdownModule, InputTextModule, MenubarModule, MessageService,
  MultiSelectModule,
  RadioButtonModule,
  ScrollPanelModule
} from 'primeng/primeng';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {CatalogFormComponent} from './catalog/catalog-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {MessageModule} from "primeng/message";
import {PanelModule} from "primeng/panel";
import {DialogModule} from "primeng/dialog";
import {ErrorCodeFormComponent} from './error-code/error-code-form.component';
import {ErrorServiceFormComponent} from './error-service/error-service-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlDataComponent,
    ConfigurationComponent,
    ErrorCodeComponent,
    CatalogComponent,
    ErrorServiceComponent,
    MenuComponent,
    SideMenuComponent,
    CatalogFormComponent,
    ErrorCodeFormComponent,
    ErrorServiceFormComponent,
    AppSubMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    NgbModule,
    TableModule,
    HttpClientModule,
    PaginatorModule,
    ContextMenuModule,
    MenubarModule,
    DynamicDialogModule,
    DialogModule,
    ButtonModule,
    ScrollPanelModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
    PanelModule,
    InputTextModule,
    RadioButtonModule,
    CheckboxModule,
    MultiSelectModule,
    DropdownModule
  ],
  providers: [HttpClient, ControlDataService, CatalogService, ConfigurationService, ErrorCodeService, ErrorServiceService, MessageService],
  bootstrap: [AppComponent],
  entryComponents: [
    CatalogFormComponent
  ]
})
export class AppModule { }
