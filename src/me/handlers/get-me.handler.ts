import { IHandler } from 'src/shared/abstracts/handler';

export class GetMeHandler implements IHandler<any> {
  constructor() {}

  async handle(args?: any) {}

  private getMeAsAdmin() {}
  private getMeAsUser() {}
}
