import { PipelineStage } from 'mongoose';
import { paginatedQuery } from '../query/paginated-query';

type Args = {
  page?: number;
  limit?: number;
  query: PipelineStage[];
};

export const makeQueryPaginated = ({
  query,
  limit = 10,
  page = 1,
}: Args): PipelineStage[] => {
  const skip = limit * (page - 1);

  return [
    ...query,
    ...paginatedQuery({
      limit,
      page,
      skip,
    }),
  ];
};
