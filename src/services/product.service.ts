import { HttpStatus } from './../utils/enums/http-status.enum';
import { HttpException } from './../handler-exceptions/http-exception.provider';
import { CreatedProductDto } from './../dtos/product/created-product.dto';
import { CreateProductDto } from './../dtos/product/create-product.dto';
import { Repository, DataSource } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

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
        'Houve um erro ao cadastrar curso!',
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

  async show(id: string): Promise<CreatedProductDto> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException(
        'Produto não encontrada!',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(product);
    return new CreatedProductDto(product);
  }

  /*async productCategory(categoryId : string): Promise<CreatedProductDto>{
    const products = await this.productRepository;
    return products.map(p)
  }*/

  async update(id: string, name: string): Promise<void> {
    try {
      await this.productRepository.update(id, { name });
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao atualizar a categoria!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao deletar categoria!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
