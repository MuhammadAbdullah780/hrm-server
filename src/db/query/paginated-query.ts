import { PipelineStage } from 'mongoose';

type PaginatedQueryArgs = {
  skip: number;
  limit: number;
  page: number;
};

export const paginatedQuery = ({ limit, page, skip }: PaginatedQueryArgs) => {
  return [
    {
      $facet: {
        data: [
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ],
        data_info: [
          {
            $group: {
              _id: null,
              count: {
                $sum: 1,
              },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        total_count: { $first: '$data_info.count' },
      },
    },
    {
      $project: {
        _id: 0,
        docs: '$data',
        meta: {
          current_page: { $toInt: `${page}` },
          total_length: '$total_count',
          current_count: { $size: '$data' },
          items_per_page: { $toInt: `${limit}` },
          total_pages: {
            $cond: {
              if: {
                $gt: ['$total_count', 0],
              },
              then: {
                $ceil: {
                  $divide: ['$total_count', limit],
                },
              },
              else: '1',
            },
          },
        },
      },
    },
  ] as PipelineStage[];
};
