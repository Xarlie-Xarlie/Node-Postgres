import 'reflect-metadata';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import routes from './routes/routes';
import "./database/connection";
import 'express-async-errors';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError){
    return response.status(err.statusCode).json({
      status: "error",
      message: err.statusCode
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })

})

app.listen(3333, () => {
  console.log('💻Back-end started at port 3333')
});
