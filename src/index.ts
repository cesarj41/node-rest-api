import 'reflect-metadata';
import './pre-start'; // Must be the first import
import { logger } from './middlewares/Logger';
import server from './server';
import { env } from "./constants";

// **** Start server **** //

server.listen(8080, () => logger.logger.info(`Server started on port: ${env.Port}`));
