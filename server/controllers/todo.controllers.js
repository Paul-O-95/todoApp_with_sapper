import express from 'express';
import bodyParser from 'body-parser';
import router from '../routes/todo.routes.js';
import cors from 'cors';


let controllers = app => {
    app.use(cors());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    app.use(bodyParser.json());
    app.use(router);

    return app;
};
export default controllers;