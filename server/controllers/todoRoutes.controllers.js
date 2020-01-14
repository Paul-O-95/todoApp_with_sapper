import Todo from '../model/todo.schema.js';


// Getting All todos
export let getAllTodo = async (req, res, next) => {
    let results = await Todo.find();
    res.json({
        status: 'success',
        data: {
            results
        }
    });
};

// Positing a Todo
export let postTodo = async (req, res, next) => {
    const { todo } = req.body;
    console.log(todo);

    const todoList = await Todo.create({
        todo
    });
    res.status(201).json({
        status: 'success',
        data: {
            todoList
        }
    });
};

// Editing a Todo
export let editTodo = async (req, res, next) => {
    let editTodo = await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body);
    let editTodos = await Todo.findById(req.params.id);
    res.json({
        status: 'success',
        data: {
            editTodos
        }
    });
};

// Deleting a Todo
export let deleteTodo = async (req, res, next) => {
    let todoRemoved = await Todo.findById(req.params.id);
    Todo.deleteOne({ _id: req.params.id }, (err, id) => {
        if (err) throw err;
        res.json({
            status: 'success',
            data: {
                todoRemoved
            }
        });
    });
};