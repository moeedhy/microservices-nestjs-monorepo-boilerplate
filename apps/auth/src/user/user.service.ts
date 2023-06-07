import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserDocument } from './models/user.schema';
import * as bcrypt from 'bcrypt';
import { User } from './graphql';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserInput: CreateUserDto): Promise<UserDocument> {
    await this.validateCreateUserDto(createUserInput);
    const passwordHashed: string = await bcrypt.hash(
      createUserInput.password,
      12,
    );
    return this.userRepository.create({
      ...createUserInput,
      password: passwordHashed,
    });
  }

  findAll(): Promise<UserDocument[]> {
    return this.userRepository.find({});
  }

  findOne(id: string) {
    return this.userRepository.findOne({ _id: id });
  }

  update(id: string, updateUserInput: UpdateUserDto): Promise<UserDocument> {
    return this.userRepository.findOneAndUpdate(
      { _id: id },
      { $set: { ...updateUserInput } },
    );
  }

  remove(id: string): Promise<UserDocument> {
    return this.userRepository.findOneAndDelete({ _id: id });
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    const passCheck = await bcrypt.compare(password, user.password);
    if (!passCheck)
      throw new UnauthorizedException('User or password is incorrect');
    return user;
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (e) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }
}
