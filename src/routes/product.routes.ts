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
      productController.getID(request, response).catch((error: Error) => {
          next(error);
      });
  }
)

routesProduct.get(
  "/products-name/:name",
  (request: Request, response: Response, next: NextFunction) => {
      productController.getName(request, response).catch((error: Error) => {
          next(error);
      });
  }
)

routesProduct.get(
  "/products-category/:id",
  (request: Request, response: Response, next: NextFunction) => {
      productController.getCategory(request, response).catch((error: Error) => {
          next(error);
      });
  }
)

routesProduct.get(
  "/products-avaliable",
  (request: Request, response: Response, next: NextFunction) => {
      productController.getDisponibility(request, response).catch((error: Error) => {
          next(error);
      });
  }
)

routesProduct.get(
  "/products-ordely",
  (request: Request, response: Response, next: NextFunction) => {
      productController.getCrescent(request, response).catch((error: Error) => {
          next(error);
      });
  }
)

routesProduct.get(
  "/products-less",
  (request: Request, response: Response, next: NextFunction) => {
      productController.getDecrescent(request, response).catch((error: Error) => {
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