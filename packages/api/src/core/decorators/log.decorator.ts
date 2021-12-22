import { Logger } from '@nestjs/common';

export function Log(shouldTime = false): any {
  return (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    target: any,
    key: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    if (process.env.NODE_ENV === 'test') return descriptor;

    const fn = descriptor.value;

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function decorated(...args: unknown[]) {
      const now = Date.now();

      const caller =
        typeof target === 'function' ? target.name : this.constructor.name;
      const logger = new Logger();
      logger.debug(`${caller}.${key}()`);

      const result = fn.call(this, ...args);

      const isAsync = !!result.then;
      if (isAsync) {
        return result.then(val => {
          const elapsedTime = Date.now() - now;
          shouldTime &&
            logger.debug(`...${caller}.${key}() took ${elapsedTime}ms`);

          return val;
        });
      } else {
        const elapsedTime = Date.now() - now;
        shouldTime &&
          logger.debug(`...${caller}.${key}() took ${elapsedTime}ms`);
        return result;
      }
    };

    // copy the metadata set by other decorators on the new descriptor
    const metadataKeys = Reflect.getMetadataKeys(fn);
    metadataKeys.forEach(k => {
      const value = Reflect.getOwnMetadata(k, fn);
      Reflect.defineMetadata(k, value, descriptor.value);
    });

    return descriptor;
  };
}
