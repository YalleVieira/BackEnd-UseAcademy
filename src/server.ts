import { resolve } from 'path';
import express from 'express';
import { routesCategory } from './routes/category.routes';
import { env } from './config/environment-variables';
import { AppDataSource } from './config/data-source';
import { errorHandler } from './middlewares';
import { routesProduct } from './routes/product.routes';

const PORT = env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(routesCategory);
app.use(routesProduct);
app.use(errorHandler);
app.use('/files', express.static(resolve(__dirname, '..', 'uploads')));


AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
  })
  .catch((error) => console.log(error));
