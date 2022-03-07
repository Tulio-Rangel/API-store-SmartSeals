import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/products.dtos';

import { ProductsService } from './../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'List of all products' })
  @Get()
  findAll(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params);
  }

  @ApiOperation({ summary: 'Obtain a product by its id' })
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @ApiOperation({ summary: 'Create a product' })
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @ApiOperation({ summary: 'Modify a product by its id' })
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a product by its id' })
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
