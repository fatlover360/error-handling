import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ControlDataComponent} from './control-data/control-data.component';
import {CatalogComponent} from './catalog/catalog.component';
import {ConfigurationComponent} from './configuration/configuration.component';
import {ErrorCodeComponent} from './error-code/error-code.component';
import {ErrorServiceComponent} from './error-service/error-service.component';
import {CatalogFormComponent} from './catalog/catalog-form.component';

const routes: Routes = [
  {path: 'control-data', component: ControlDataComponent},
  {
    path: 'catalog', component: CatalogComponent,
    children: [
      {path: '', redirectTo: 'catalog', pathMatch: 'full'},
      {path: 'new', component: CatalogFormComponent},
      {path: ':id/edit', component: CatalogFormComponent}
    ]
  },
  {path: 'configuration', component: ConfigurationComponent},
  {path: 'error-code', component: ErrorCodeComponent},
  {path: 'error-service', component: ErrorServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
