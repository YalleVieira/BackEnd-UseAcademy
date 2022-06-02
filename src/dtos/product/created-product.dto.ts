
import { ProductEntity } from "../../entities/product.entity";
import { CreateProductDto } from "./create-product.dto";

export class CreatedProductDto extends CreateProductDto{
    id!: string
    created_at_product!: Date;
    updated_at_product!: Date;
  
    constructor({
      name,
      description,
      value,
      disponibility,
      image,
      id,
      category, 
    }: ProductEntity) {
      super();
      this.id = id;
      this.name = name;
      this.description = description;
      this.value = value;
      this.disponibility =
        typeof disponibility === "string" && disponibility === "true"
          ? true
          : false;
      this.image = image;
      this.created_at_product = this.created_at_product;
      this.updated_at_product = this.updated_at_product;
      this.categoryId = category.id;
    }
}