import { HttpStatus, Injectable } from '@nestjs/common';
import { IHandler } from 'src/shared/abstracts/handler';
import { BullkUserEditMode, EditBulkUserDto } from '../typings';
import { UserService } from '../user.service';
import { AppException } from 'src/shared/exceptions/app-exception';

@Injectable()
export class EditBulkUserHandler implements IHandler<EditBulkUserDto> {
  constructor(private readonly service: UserService) {}

  async handle(args?: EditBulkUserDto) {
    let returnPayload: Record<string, any>;

    // validating bulk edit on basis of mode ( Mode is Enum )
    switch (args.mode) {
      case BullkUserEditMode.DEACTIVATE_ACCOUNTS:
        returnPayload = await this.handleDeActivation();

      case BullkUserEditMode.ASSIGN_JOB_TITLE:
        returnPayload = await this.handleJobTitleAssignment();

      case BullkUserEditMode.CHANGE_EMPLOYMENT_STATUS:
        returnPayload = await this.handleEmploymentStatusEdit();

      case BullkUserEditMode.ASSIGN_CLAIM:
        returnPayload = await this.handleClaimAssignment();

        // returning response
        return {
          data: returnPayload,
          message: 'Successfull edit Users.',
        };
    }
  }

  private async handleDeActivation() {
    //
    return await this?.service?.deActivateBulkAccounts({ users: [] });
  }

  private async handleJobTitleAssignment() {
    //
    return await this.service?.assignJobTitleToBulkUsers({
      job_title: '',
      users: [],
    });
  }

  private async handleEmploymentStatusEdit() {
    //
    return await this.service?.assignEmpStatusToBulkUsers({
      users: [],
      emp_status: '',
    });
  }

  private async handleClaimAssignment() {
    return {};
  }
}
