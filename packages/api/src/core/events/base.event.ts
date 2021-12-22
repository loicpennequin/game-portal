export abstract class BaseEvent<T> {
  constructor(public payload: T) {}
}
