import { CreateProductDto } from './../dtos/product/create-product.dto';
import { CreatedCategoryDto } from './../dtos/category/created-category.dto';
import { HttpStatus } from './../utils/enums/http-status.enum';
import { Request, Response } from 'express';
import { ProductService } from './../services/product.service';
import { CreatedProductDto } from '../dtos/product/created-product.dto';
import { param } from 'express-validator';

interface CreateProductBody extends Request {
  body: CreateProductDto;
}

export class ProductController {
  constructor(private readonly productService: ProductService) { }


  async create(
    { body, file }: CreateProductBody,
    response: Response
  ): Promise<Response<CreatedProductDto>> {
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

  async getID(
    { params }: Request,
    response: Response,
  ): Promise<Response<CreatedCategoryDto[]>> {
    const product = await this.productService.getID(params.id);
    return response.status(HttpStatus.OK).json(product);
  }

  async getCategory({ params }: Request,
    response: Response,
  ): Promise<Response<CreatedCategoryDto[]>> {
    const product = await this.productService.getCategory(params.id);
    return response.status(HttpStatus.OK).json(product);
  }

  async getDisponibility(
    _request: Request,
    response: Response,
  ): Promise<Response<CreatedCategoryDto[]>> {
    const productsAvailable = await this.productService.getDisponibility();
    return response.status(HttpStatus.OK).json(productsAvailable);
  }

  async getOrder(
    _request: Request,
    response: Response,
  ): Promise<Response<CreatedCategoryDto[]>> {
    const products = await this.productService.getOrder();
    return response.status(HttpStatus.OK).json(products);
  }

  async getLess(
    _request: Request,
    response: Response,
  ): Promise<Response<CreatedCategoryDto[]>> {
    const products = await this.productService.getLess();
    return response.status(HttpStatus.OK).json(products);
  }

  async update({ body: category, params }: Request, response: Response) {
    await this.productService.update(
      params.id,
      category?.name,
      category?.updated_at
    );
    return response.status(HttpStatus.NO_CONTENT).json();
  }

  async delete({ params }: Request, response: Response) {
    await this.productService.delete(params.id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
