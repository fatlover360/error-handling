import { Component, OnInit } from '@angular/core';
import {Configuration} from '../model/configuration';
import {ConfigurationService} from './configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public configurationArray: Configuration[];
  isLoading: boolean;

  constructor(private catalogService: ConfigurationService) { }

  ngOnInit() {
    this.isLoading = true;
    this.catalogService.getConfigurationItems().then(controlData => {
      this.configurationArray = controlData;
      this.isLoading = false;
    });
  }
}
