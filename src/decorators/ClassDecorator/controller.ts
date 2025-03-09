import "reflect-metadata";

/**
 * Class decorator to define a controller with a specific prefix.
 * @param prefix - The prefix for the controller routes.
 * @returns A class decorator function.
 */
export function Controller(prefix: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("prefix", prefix, target);
    if (!Reflect.hasMetadata("routes", target)) {
      Reflect.defineMetadata("routes", [], target);
    }
  };
}
