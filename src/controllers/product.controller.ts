import { CreateProductDto } from './../dtos/product/create-product.dto';
import { CreatedCategoryDto } from './../dtos/category/created-category.dto';
import { HttpStatus } from './../utils/enums/http-status.enum';
import { Request, Response } from 'express';
import { ProductService } from './../services/product.service';

interface CreateProductBody extends Request {
  body: CreateProductDto;
}

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async create(
    { body, file }: CreateProductBody,
    response: Response,
  ): Promise<Response<CreatedCategoryDto>> {
    const product = await this.productService.create({
      ...body,
      image: file!.filename,
    });
    return response.status(HttpStatus.CREATED).json(product);
  }

  async getAll(
    _request: Request,
    response: Response,
  ): Promise<Response<CreatedCategoryDto[]>> {
    const products = await this.productService.getAll();
    return response.status(HttpStatus.OK).json(products);
  }

  async show(
    { params }: Request,
    response: Response,
  ): Promise<Response<CreatedCategoryDto[]>> {
    const product = await this.productService.show(params.id);
    return response.status(HttpStatus.OK).json(product);
  }

  async update({ body: category, params }: Request, response: Response) {
    await this.productService.update(
      params.id,
      category?.name,
    );
    return response.status(HttpStatus.NO_CONTENT).json();
  }

  async delete({ params }: Request, response: Response) {
    await this.productService.delete(params.id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
