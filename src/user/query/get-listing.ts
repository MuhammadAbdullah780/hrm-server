import { PipelineStage } from 'mongoose';

export const getUserListingQuery = () => {
  return [
    {
      $match: {},
    },
  ] as PipelineStage[];
};
