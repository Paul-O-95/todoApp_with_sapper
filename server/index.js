import express from 'express';
import controllers from './controllers/todo.controllers.js';
import mongoose from 'mongoose';

let app = express();

let PORT = process.env.PORT || 2020;

app = controllers(app);


app.listen(PORT, () => {
    console.log(`Port ringing on ${PORT}`);

    mongoose.connect('mongodb://localhost:27017/todoAppSapper', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection.on('error', err => console.log(err));
    mongoose.connection.once("open", () => {
        console.log("DataBase is Ringing Ringing...");
    });
});