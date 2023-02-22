/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { routing } from "./routing";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

export function swagger () {
  const schemas: any = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });
        
  const storage = getMetadataArgsStorage();
  return routingControllersToSpec(storage, routing, {
    components: {
      schemas,
    },
    info: {
      description: 'Endpoints documentation.`',
      title: 'A sample API',
      version: '1.0.0',
    },
  });
}