export abstract class IHandler<T extends any = {}> {
  abstract handle(args?: T);
}
