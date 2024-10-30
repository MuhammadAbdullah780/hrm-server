import { IHandler } from 'src/shared/abstracts/handler';

export class UpdateMeHandler implements IHandler<any> {
  async handle(args?: any) {}

  private updateMeAsAdmin() {}
  private updateMeAsUser() {}
}
