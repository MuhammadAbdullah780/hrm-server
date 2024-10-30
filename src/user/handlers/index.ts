import { CreateUserHandler } from './create-user.handler';
import { DeleteBulkUserHandler } from './delete-bulk-users.handler';
import { EditBulkUserHandler } from './edit-bulk-users.handler';
import { EditSpecificUserHandler } from './edit-specific-user.handler';
import { GetUserListingHandler } from './get-user-listing.handler';

export const UserHandlers = [
  CreateUserHandler,
  EditBulkUserHandler,
  EditSpecificUserHandler,
  DeleteBulkUserHandler,
  GetUserListingHandler,
];
