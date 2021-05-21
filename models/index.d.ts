import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Behavior {
  readonly id: string;
  readonly label?: string;
  constructor(init: ModelInit<Behavior>);
  static copyOf(source: Behavior, mutator: (draft: MutableModel<Behavior>) => MutableModel<Behavior> | void): Behavior;
}