import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import {
  GqlCurrentUser,
  GqlJwtAuthGuard,
  Roles,
  TokenPayloadInterface,
  UserRoles,
} from '@app/common';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  @UseGuards(GqlJwtAuthGuard)
  @Roles(UserRoles.admin)
  create(@Args('createUserInput') createUserInput: CreateUserDto) {
    return this.userService.create(createUserInput);
  }

  @Query('users')
  @UseGuards(GqlJwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query('user')
  @UseGuards(GqlJwtAuthGuard)
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Query('currentUser')
  @UseGuards(GqlJwtAuthGuard)
  currentUser(@GqlCurrentUser() user: TokenPayloadInterface) {
    return this.userService.findOne(user.id);
  }

  @Mutation('updateUser')
  @UseGuards(GqlJwtAuthGuard)
  update(@Args('updateUserInput') updateUserInput: UpdateUserDto) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  @UseGuards(GqlJwtAuthGuard)
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }
}
