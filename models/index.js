// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Behavior } = initSchema(schema);

export {
  Behavior
};