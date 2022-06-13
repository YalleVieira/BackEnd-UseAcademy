import { HttpStatus } from './../utils/enums/http-status.enum';
import { HttpException } from './../handler-exceptions/http-exception.provider';
import { CreatedProductDto } from './../dtos/product/created-product.dto';
import { CreateProductDto } from './../dtos/product/create-product.dto';
import { Repository, DataSource, RelationQueryBuilder } from 'typeorm';
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

  //lista todos os produtos de uma única categoria
    async getCategory(category_id: string) {
      const products = await this.productRepository.find({
        relations: ['category'],
      });
      var productsCategory = products.filter(product => product.category.id == category_id);
      return productsCategory;
    }


  //retorna os produtos disponíveis
  async getDisponibility() {
    try {
      const products = await this.productRepository.find({
        relations: ['category'],
      });
      var productsAvailable = products.filter(product => product.disponibility == true);
      if (productsAvailable.length == 0) {
        throw new HttpException(
          'Não existem produtos disponíveis!',
          HttpStatus.NOT_FOUND,
        );
      }
      return productsAvailable;
    } catch (error) {
      throw new HttpException(
        'Houve um erro ao recuperar os produtos!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //retorna os produtos ordenados pelo valor, de modo crescente
  async getOrder() {
    const product = await this.productRepository.find({
      relations: ['category'],
    });
    var productOrdely = product.sort(function (value1, value2) {
      return value1.value - value2.value;
    });
    return productOrdely;
  }

  //retorna os produtos ordenados pelo valor, de modo decrescente
  async getLess() {
    const product = await this.productRepository.find({
      relations: ['category'],
    });
    var productLess = product.sort(function (value1, value2) {
      return value2.value - value1.value;
    });
    return productLess;
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
