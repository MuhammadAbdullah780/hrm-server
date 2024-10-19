import { IHandler } from 'src/shared/abstracts/handler';
import { CreateAdminDto } from '../typings';

export class CreateAdminHandler implements IHandler<CreateAdminDto> {
  handle(args?: CreateAdminDto) {}
}
