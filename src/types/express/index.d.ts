import 'express';
import { Logger } from 'pino';


// **** Declaration Merging **** //

declare module 'express' {

  export interface Request {
    signedCookies: Record<string, string>;
  }
}
