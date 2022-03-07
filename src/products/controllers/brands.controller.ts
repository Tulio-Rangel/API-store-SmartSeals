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

import { BrandsService } from '../services/brands.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
  FilterBrandDto,
} from '../dtos/brand.dtos';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @ApiOperation({ summary: 'List of all brands' })
  @Get()
  findAll(@Query() params: FilterBrandDto) {
    return this.brandsService.findAll(params);
  }

  @ApiOperation({ summary: 'Obtain a brand by its id' })
  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.findOne(id);
  }

  @ApiOperation({ summary: 'create a brand' })
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @ApiOperation({ summary: 'Modify a brand by its id' })
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a brand by its id' })
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.remove(id);
  }
}
