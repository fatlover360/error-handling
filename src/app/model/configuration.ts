import {Catalog} from './catalog';
import {ErrorCode} from './error-code';

export class Configuration {
  APPLICATION_NAME?: string;
  EAI_CATALOG_ID: string;
  EAI_ERROR_CODE_ID: string;
  MAX_RETRIES: string;
  WAIT_TIME_SECS: string;
  DELTA_TIME_SECS: string;
  DELTA_PERCENTAGE: string;
  Catalog: Catalog;
  ErrorCode: ErrorCode;
}

