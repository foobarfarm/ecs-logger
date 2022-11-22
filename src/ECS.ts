import type { EcsTree } from 'elastic-ecs';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

// Make all of the properties of EcsTree optional
export interface ECS extends RecursivePartial<EcsTree> {}
