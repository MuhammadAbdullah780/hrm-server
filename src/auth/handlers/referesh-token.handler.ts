import { Injectable } from '@nestjs/common';
import { IHandler } from 'src/shared/abstracts/handler';

@Injectable()
export class RefereshTokenHandler implements IHandler<any> {
  async handle(args: any) {}
}
