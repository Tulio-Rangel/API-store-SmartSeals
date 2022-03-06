import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @ApiOperation({ summary: 'List of all customers' })
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @ApiOperation({ summary: 'Obtain a customer by its id' })
  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.customersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a customer' })
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @ApiOperation({ summary: 'Modify a customer by its id' })
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a customer by its id' })
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.customersService.remove(id);
  }
}
