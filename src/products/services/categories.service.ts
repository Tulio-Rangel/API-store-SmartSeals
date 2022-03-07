import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto, FilterCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  findAll(params?: FilterCategoryDto) {
    if (params) {
      const { limit, offset } = params;
      return this.categoryModel.find().skip(offset).limit(limit).exec();
    }
    return this.categoryModel.find().exec();
  }

  findOne(id: string) {
    const category = this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  update(id: string, changes: UpdateCategoryDto) {
    const category = this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return category;
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndRemove(id);
  }
}
