import {ErrorCode} from './error-code';
import {Catalog} from './catalog';

export class ErrorService {
  APPLICATION_NAME: string;
  ID: number;
  SYSTEM_NATIVE_CODE: string;
  IS_ERROR: boolean;
  Catalog: Catalog;
  ErrorCode: ErrorCode;
}

