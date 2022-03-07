import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'List of all users' })
  @Get()
  findAll(@Query() params: FilterUserDto) {
    return this.usersService.findAll(params);
  }

  @ApiOperation({ summary: 'Obtain an user by its id' })
  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'List of all orders by user' })
  @Get(':id/orders')
  getOrders(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.getOrderByUser(id);
  }

  @ApiOperation({ summary: 'Create an user' })
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiOperation({ summary: 'Modify an user by its id' })
  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an user by its id' })
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
