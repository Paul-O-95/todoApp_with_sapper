import Todo from '../model/todo.schema.js';



export let getAllTodo = async (req, res, next) => {
    let results = await Todo.find();

    // res.send(results);
    res.json({
        status: 'success',
        data: {
            results
        }
    });
};
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
    // res.redirect('http://localhost:3000/addTodo');
};
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