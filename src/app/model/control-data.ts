import {Catalog} from './catalog';

export class ControlData {
  EH_CONTROL_DATA_ID: string;
  EAI_CATALOG_ID: string;
  EH_CONTROL_SEQUENCE_ID: string;
  EAI_ERROR_CODE: string;
  EH_RETRY: string;
  EH_STATUS: string;
  EH_PUBLISH_DATE: string;
  SERVICE_START_MSG: string;
  HEADERS: string;
  INSERT_DATETIME: string;
  UPDATE_DATETIME: string;
  SERVICE_NAME: string;
  Catalog: Catalog;
}
