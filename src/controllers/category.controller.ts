import { Request, Response } from 'express';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import { CreatedCategoryDto } from '../dtos/category/created-category.dto';
import { CategoryService } from '../services/category.service';
import { HttpStatus } from '../utils/enums/http-status.enum'

interface CreateCategoryBody extends Request {
  body: CreateCategoryDto;
}

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async getAll(request: Request, response: Response) {
    const categories = await this.categoryService.getAll();
    return response.status(HttpStatus.OK).json(categories);
  }

  async create({ body: { name } }: CreateCategoryBody, response: Response): Promise<Response<CreatedCategoryDto>> {
    const createdCategory = await this.categoryService.create({ name });
    return response.status(HttpStatus.CREATED).json(createdCategory);
  }

  async getID({ params }: Request, response: Response) {
    const category = await this.categoryService.getID(params.id);
    return response.status(HttpStatus.OK).json(category);
  }

  async update({body: category, params }: Request, response: Response) {
    category.updated_at = new Date;
    await this.categoryService.update(params.id, category?.name, category.updated_at);
    return response.status(HttpStatus.NO_CONTENT).json();
  }

  async delete({ params }: Request, response: Response) {
    await this.categoryService.delete(params.id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}