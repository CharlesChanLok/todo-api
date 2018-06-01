import TodoService from "../services/TodoService";
import * as express from 'express';
import { Request, Response } from 'express';

/**
*   Todo Router
*   Requests from : '/todos'
*/

class TodoRouter {
    constructor(private todoService: TodoService) {
        this.todoService = todoService;
    }

    getRouter = () => {
        const router = express.Router();
        router.get('/', this.getTodos);
        router.post('/', this.createTodo);
        router.put('/:id', this.editTodo);
        router.delete('/:id', this.deleteTodo);
        return router;
    }

    getTodos = async (req: Request, res: Response) => {
        try {
            const todos = await this.todoService.getTodos();
            return res.json(todos);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }

    createTodo = async (req: Request, res: Response) => {
        try {
            const todo = await this.todoService.createTodo(req.body);
            if (todo[0]) {
                return res.json(todo[0]);
            } else {
                return res.status(404).json('Failed to create todo');
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }

    editTodo = async (req: Request, res: Response) => {
        try {
            const todo = await this.todoService.updateTodo(req.params.id, req.body);
            if (todo[0]) {
                return res.json(todo[0]);
            } else {
                return res.status(404).json('Todo not found');
            }

        }
        catch (err) {
            return res.status(500).json(err);
        }
    }

    deleteTodo = async (req: Request, res: Response) => {
        try {
            const todo = await this.todoService.deleteTodo(req.params.id);
            if (todo) {
                return res.json(todo);
            } else {
                return res.status(404).json('Todo not found');
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

export default TodoRouter;