const express = require('express');
const mongoose = require('mongoose');

const leaderRouter = express.Router();

const Leaders = require('../models/leaders');

var authenticate = require('../authenticate');

//If you are using Express>= 4.16.0, body parser has been re-added under the methods
//express.json() and express.urlencoded()
//app.use(bodyParser.json())
leaderRouter.use(express.json());

leaderRouter.route('/')
    .get((req, res, next)=>{
        Leaders.find({})
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err)=>next(err))
        .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next)=>{
        Leaders.create(req.body)
        .then((lead)=>{
            console.log('Leader Created', lead);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(lead);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    })
    .put(authenticate.verifyUser, (req, res, next)=>{
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete(authenticate.verifyUser, (req, res, next)=>{
        Leaders.remove({})
        .then((ld)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ld);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    });

leaderRouter.route('/:leaderId')
    .get((req, res, next)=>{
        Leaders.findById(req.params.leaderId)
        .then((leaders)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    })
    .post(authenticate.verifyUser, (req, res, next)=>{
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    .put(authenticate.verifyUser, (req, res, next)=>{
        Leaders.findByIdAndUpdate(req.params.leaderId, {$set: req.body}, {new: true})
        .then((ldr)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ldr);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    })
    .delete(authenticate.verifyUser, (req, res, next)=>{
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then((leadrid)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leadrid);
        }, (err)=>next(err))
        .catch((err)=>next(err));
    });

    
module.exports = leaderRouter;
