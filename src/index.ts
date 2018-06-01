import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Request, Response } from 'express';
import * as knex from 'knex';

import TodoRouter from './routers/TodoRouter';
import TodoService from './services/TodoService';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;

const knexfile = require('../knexfile')[NODE_ENV];
const pg = knex(knexfile);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const todoService = new TodoService(pg);

const todoRouter = new TodoRouter(todoService);

app.get('/', (req: Request, res: Response) => res.send('Todo app is running'));
app.use('/todos', todoRouter.getRouter());

/**
 * Error Handler 
 */
app.use((req: Request, res: Response) => {
    res.status(404).json('Not Found');
})

app.listen(PORT, () => {
    console.log('Listening on port:', PORT)
});

