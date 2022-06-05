import { HttpStatus } from './../utils/enums/http-status.enum';
import { HttpException } from './../handler-exceptions/http-exception.provider';
import { CreatedProductDto } from './../dtos/product/created-product.dto';
import { CreateProductDto } from './../dtos/product/create-product.dto';
import { Repository, DataSource } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { CategoryEntity } from '../entities/category.entity';

export class ProductService {
  private productRepository: Repository<ProductEntity>;

  constructor(private readonly connection: DataSource) {
    this.productRepository = this.connection.getRepository(ProductEntity);
  }

  async create({
    categoryId,
    name,
    description,
    disponibility,
    image,
    value,
  }: CreateProductDto): Promise<CreatedProductDto> {
    try {
      const createProduct = this.productRepository.create({
        category: { id: categoryId },
        name,
        description,
        disponibility,
        image,
        value,
      });
      const saveProduct = await this.productRepository.save(createProduct);
      return new CreatedProductDto(saveProduct);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao cadastrar produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAll(): Promise<CreatedProductDto[]> {
    try {
      const product = await this.productRepository.find({
        relations: ['category'],
      });
      return product.map((product) => new CreatedProductDto(product));
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao listar os produtos!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getID(id: string): Promise<CreatedProductDto> {
    try {
      const product = await this.productRepository.findOne({
        relations: ['category'],
        where: { id },
      });
      if (!product) {
        throw new HttpException(
          'Produto não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }
      return new CreatedProductDto(product);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao recuperar produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, name: string, updated_at: Date): Promise<void> {
    try {
      await this.productRepository.update(id, { name });
      await this.productRepository.update(id, { updated_at });
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao atualizar o produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao deletar o produto!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
