import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregateOptions, Model, PipelineStage } from 'mongoose';
import { makeQueryPaginated } from 'src/db/functions/make-query-paginated';
import { User } from 'src/db/models/user';
import { DbModels } from 'src/db/typings';
import { getUserListingQuery } from './query/get-listing';
import { CreateUserDto } from './typings';
import { AccountStatus } from 'src/db/enums/shared';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<User>,
  ) {}

  async isEmailExists(email: string) {
    const isExists = await this?.model?.countDocuments({ email });
    return Boolean(isExists);
  }

  async createNewUser(doc: CreateUserDto) {
    return await this?.model?.create(doc);
  }

  async getUserByEmail(email: string) {
    const data = await this?.model
      ?.findOne({ email })
      ?.select('+password')
      ?.lean(true);

    return data;
  }

  async getUserThroughId(id: string) {
    return (await this?.model?.findById(id)?.lean(true)) as DbModels.IUser;
  }

  async deleteBulkUsers(ids: string[]) {
    return await this?.model?.deleteMany({
      _id: { $in: ids },
    });
  }

  async getUsersWithFiltersAndPagination() {
    // extending pagination functionality
    const paginatedQuery = makeQueryPaginated({
      query: getUserListingQuery(),
    });

    //
    return await this?.model?.aggregate(paginatedQuery);
  }

  async deActivateBulkAccounts({ users }: { users: string[] }) {
    return await this.model.updateMany(
      {
        $and: [
          // filter throug users
          {
            _id: { $in: users },
          },
          // check if it is already deactivated
          {
            account_status: { $ne: AccountStatus.DE_ACTIVATED },
          },
        ],
      },
      {
        //
        $set: {
          account_status: AccountStatus.DE_ACTIVATED,
        },
      },
    );
  }

  async assignJobTitleToBulkUsers({
    job_title,
    users,
  }: {
    users: string[];
    job_title: string;
  }) {
    return await this.model?.updateMany(
      {
        $and: [
          {
            _id: { $in: users },
            job_title: { $ne: job_title },
          },
          { job_title },
        ],
      },
      {},
    );
  }

  async assignEmpStatusToBulkUsers({
    users,
    emp_status,
  }: {
    users: string[];
    emp_status: string;
  }) {
    return await this.model?.updateMany(
      //
      {
        _id: { $in: users },
        'employment_status.title': emp_status,
      },
      //
      {
        $set: {
          'employment_status.$[elem].title': emp_status,
        },
      },
      //
      {
        arrayFilters: [
          {
            elem: { $eq: { $last: '$employment_status' } },
          },
        ],
      },
    );
  }

  async applyAggregation(
    query: PipelineStage[],
    options: AggregateOptions = {},
  ) {
    return await this.model?.aggregate(query, options);
  }
}
