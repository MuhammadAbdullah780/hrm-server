import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/shared/abstracts/handler';
import { UserService } from '../user.service';
import { makeQueryPaginated } from 'src/db/functions/make-query-paginated';
import { getUserListingQuery } from '../query/get-listing';

@Injectable()
export class GetUserListingHandler implements IHandler<any> {
  constructor(private readonly service: UserService) {}

  async handle(args?: any) {
    // appending pagination logic with current query
    const paginatedQuery = makeQueryPaginated({
      query: getUserListingQuery(),
      limit: 10,
      page: 1,
    });

    //
    const data = await this.service?.applyAggregation(paginatedQuery);

    //
    return {
      data,
      message: 'Successfully fetched results',
    };
  }
}
