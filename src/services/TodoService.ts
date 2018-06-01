import * as Knex from 'knex';

/**
*   Todo Service
*   Database queries 
*   Tables : todos
*/

interface ITodo {
    title: string,
    description: string,
    status: string,
    date: Date
}

class TodoService {
    constructor(private db: Knex) {
        this.db = db;
    }

    getTodos = () => {
        return this.db('todos').select();
    }

    createTodo = (todo: ITodo) => {
        return this.db('todos').insert(todo).returning('*');
    }

    updateTodo = (todoId: number, criteria: ITodo) => {
        return this.db('todos').update(criteria)
            .where('id', todoId)
            .returning('*');
    }

    deleteTodo = (todoId: number) => {
        return this.db('todos').where('id', todoId).del();
    }
}

export default TodoService;