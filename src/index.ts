import 'reflect-metadata';
import * as dotenv from "dotenv";
// eslint-disable-next-line node/no-process-env
dotenv.config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`});
import logger from 'jet-logger';
import server from './server';


// **** Start server **** //

const msg = (`Server started on port: ${process.env.PORT ?? "pro"}`);
server.listen(8080, () => logger.info(msg));
