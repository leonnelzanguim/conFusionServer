const express = require('express');
const mongoose = require('mongoose');

const promoRouter = express.Router();

const Promotions = require('../models/promotions');
var authenticate = require('../authenticate');

//If you are using Express>= 4.16.0, body parser has been re-added under the methods
//express.json() and express.urlencoded()
//app.use(bodyParser.json())

promoRouter.use(express.json());

promoRouter.route('/')
    .get((req, res, next)=>{
        Promotions.find({})
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions);
        }, (err)=>next(err))
        .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next)=>{
        Promotions.create(req.body)
        .then((promo)=>{
            console.log('Promotion Created', promo);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    })
    .put(authenticate.verifyUser, (req, res, next)=>{
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete(authenticate.verifyUser, (req, res, next)=>{
        Promotions.remove({})
        .then((pr)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(pr);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    });

promoRouter.route('/:promoId')
    .get((req, res, next)=>{
        Promotions.findById(req.params.promoId)
        .then((promo)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    })
    .post(authenticate.verifyUser, (req, res, next)=>{
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put(authenticate.verifyUser, (req, res, next)=>{
        Promotions.findByIdAndUpdate(req.params.promoId, {$set: req.body}, {new: true})
        .then((pro)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(pro);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next)=>{
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((prom)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(prom);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    });
    

    
module.exports = promoRouter;
