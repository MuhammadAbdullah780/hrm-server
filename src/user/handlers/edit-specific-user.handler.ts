import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/shared/abstracts/handler';

@Injectable()
export class EditSpecificUserHandler implements IHandler<any> {
  constructor() {}

  async handle(args?: any) {}

  private async handlePhoneNumberChange() {}

  private async handleEmailChange() {}

  private async handleAssignJobTitle() {}

  private async handleChangeWorkType() {}

  private async handleChangeWorkHours() {}

  private async handleDeActivateAccount() {}

  private async handleChangeEmploymentStatus() {}

  private async handleChangeEmploymentType() {}
}
