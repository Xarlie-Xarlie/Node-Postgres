import 'reflect-metadata';
import * as express from 'express';

import routes from './routes/routes';
import "./database/connection";
import 'express-async-errors';
import uploadConfig from './config/upload';


const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('💻Back-end started at port 3333')
});
