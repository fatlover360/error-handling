export class Catalog {
  EAI_CATALOG_ID?: number;
  APPLICATION_NAME: string;
  SERVICE_NAME: string;
  SYSTEM: string;
  SERVICE_TYPE: string;
  SERVICE_FUNCTION: string;
  SERVICE_OPERATION: string;
  SERVICE_VERSION: string;
  RECEIVER_TYPE: string;
  RECEIVER_DESTINATION: string;
  HAS_HANDLING: boolean;
  HAS_SEQUENCE: boolean;

  constructor(APPLICATION_NAME: string,
              SERVICE_NAME: string,
              SYSTEM: string,
              SERVICE_TYPE: string,
              SERVICE_FUNCTION: string,
              SERVICE_OPERATION: string,
              SERVICE_VERSION: string,
              RECEIVER_TYPE: string,
              RECEIVER_DESTINATION: string,
              HAS_HANDLING: boolean,
              HAS_SEQUENCE: boolean,) {
    this.APPLICATION_NAME = APPLICATION_NAME;
    this.SERVICE_NAME = SERVICE_NAME;
    this.SYSTEM = SYSTEM;
    this.SERVICE_TYPE = SERVICE_TYPE;
    this.SERVICE_FUNCTION = SERVICE_FUNCTION;
    this.SERVICE_OPERATION = SERVICE_OPERATION;
    this.SERVICE_VERSION = SERVICE_VERSION;
    this.RECEIVER_TYPE = RECEIVER_TYPE;
    this.RECEIVER_DESTINATION = RECEIVER_DESTINATION;
    this.HAS_HANDLING = HAS_HANDLING;
    this.HAS_SEQUENCE = HAS_SEQUENCE;

  }
}

