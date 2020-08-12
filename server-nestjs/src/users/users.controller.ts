import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('firstName') userFirstName: string,
    @Body('lastName') userLastName: string,
    @Body('email') userEmail: string,
  ) {
    const generatedId = await this.usersService.insertUser(
     userFirstName,
     userLastName,
     userEmail,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }
}
