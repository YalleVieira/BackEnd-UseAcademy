import { UpdateCategoryDto } from './../dtos/category/updated-category.dto';
import { CreateCategoryDto } from './../dtos/category/create-category.dto';
import { Router, Request, Response, NextFunction } from 'express';
import { validator } from './../middlewares';
import { AppDataSource } from './../config/data-source';
import { CategoryController } from './../controllers/category.controller';
import { CategoryService } from './../services/category.service';

const routesCategory = Router();

const categoryController = new CategoryController(
  new CategoryService(AppDataSource)
);

routesCategory.get('/', (request: Request, response: Response) => {
  return response.json({ status: 'success', version: '1.0.0' }).status(200);
});

routesCategory.get('/categories', (request: Request, response: Response, next: NextFunction) => {
  categoryController.getAll(request, response).catch((error: Error) => {
    next(error);
  });
});

routesCategory.post('/categories',
  CreateCategoryDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.create(request, response).catch((error: Error) => {
      next(error);
    });
  });

  routesCategory.get(
    "/categories/:id",
    (request: Request, response: Response, next: NextFunction) => {
      categoryController.getID(request, response).catch((error: Error) => {
        next(error);
      });
    }
  );

routesCategory.put('/categories/:id',
  UpdateCategoryDto.validators(),
  validator, 
  (request: Request, response: Response, next: NextFunction) => {
  categoryController.update(request, response).catch((error: Error) => {
    next(error);
  });
});

routesCategory.delete(
  "/categories/:id",
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.delete(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

export { routesCategory };