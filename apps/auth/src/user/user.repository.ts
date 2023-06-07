import { AbstractRepository } from '@app/common';
import { UserDocument } from './models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected readonly logger: Logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
