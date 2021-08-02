const express = require('express');
const mongoose = require('mongoose');

const dishRouter = express.Router();

const Dishes = require('../models/dishes');

//If you are using Express>= 4.16.0, body parser has been re-added under the methods
//express.json() and express.urlencoded()
//app.use(bodyParser.json())
dishRouter.use(express.json());

dishRouter.route('/')
    .get((req, res, next)=>{
        Dishes.find({})
        .then((dishes)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
        }, (err)=> next(err))
        .catch((err)=>next(err));
    })
    .post((req, res, next)=>{
        Dishes.create(req.body)
        .then((dish)=>{
            console.log('Dish Created', dish);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    })
    .put((req, res, next)=>{
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete((req, res, next)=>{
        Dishes.remove({})
        .then((resq)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    });

dishRouter.route('/:dishId')
    .get((req, res, next)=>{
        Dishes.findById(req.params.dishId)
        .then((dish)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err)=> next(err))
        .catch((err)=>next(err));
    })
    .post((req, res, next)=>{
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+ req.params.dishId);
    })
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
        .then((dis) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dis);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete((req, res, next)=>{
        Dishes.findByIdAndRemove(req.params.dishId)
        .then((re)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(re);
        },(err)=>next(err))
        .catch((err)=>next(err));
    });

    
module.exports = dishRouter;
    