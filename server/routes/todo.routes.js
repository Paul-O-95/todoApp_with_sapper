import express from 'express';
import { getAllTodo, postTodo, deleteTodo } from '../controllers/todoRoutes.controllers.js';

const router = express.Router();

router.get('/', getAllTodo);
router.post('/addTodo', postTodo);
router.delete('/deleteTodo/:id', deleteTodo);

export default router;