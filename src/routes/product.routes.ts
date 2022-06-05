import { CreateProductDto } from './../dtos/product/create-product.dto';
import {NextFunction, Request, Response, Router} from 'express';
import multer from 'multer';
import { AppDataSource } from '../config/data-source';
import { multerConfig } from '../config/multer';
import { ProductController } from '../controllers/product.controller';
import { validator } from '../middlewares';
import { ProductService } from '../services/product.service';
import { UpdateProductDto } from '../dtos/product/updated-product.dto';

const routesProduct = Router();

const productController = new ProductController(
  new ProductService(AppDataSource),
);


routesProduct.post(
    "/products",
    multer(multerConfig).single('image'),
    CreateProductDto.validators(),
    validator,
    (request: Request, response: Response, next: NextFunction) => {
        console.log(request.body)
        productController.create(request, response).catch((error: Error) => {
            next(error);
        });
    }
)

routesProduct.get(
    "/products",
    (request: Request, response: Response, next: NextFunction) => {
        productController.getAll(request, response).catch((error: Error) => {
            next(error);
        });
    }
)

routesProduct.get(
    "/products/:id",
    (request: Request, response: Response, next: NextFunction) => {
        productController.show(request, response).catch((error: Error) => {
            next(error);
        });
    }
)  

routesProduct.put('/products/:id',
  UpdateProductDto.validators(),
  validator, 
  (request: Request, response: Response, next: NextFunction) => {
  productController.update(request, response).catch((error: Error) => {
    next(error);
  });
});

routesProduct.delete(
    "/products/:id",
    (request: Request, response: Response, next: NextFunction) => {
      productController.delete(request, response).catch((error: Error) => {
        next(error);
      });
    }
  );

export { routesProduct };