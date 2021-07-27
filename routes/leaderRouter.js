const express = require('express');

const leaderRouter = express.Router();

//If you are using Express>= 4.16.0, body parser has been re-added under the methods
//express.json() and express.urlencoded()
//app.use(bodyParser.json())

leaderRouter.use(express.json());

leaderRouter.route('/')
    .all((req, res, next)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next)=>{
        res.end('Will send all the leaders to you!');
    })
    .post((req, res, next)=>{
        res.end('Will add the leader: '+ req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next)=>{
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete((req, res, next)=>{
        res.end('Deleting all leaders');
    });

leaderRouter.route('/:leaderId')
    .get((req, res, next)=>{
        res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
    })
    .post((req, res, next)=>{
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
    })
    .put((req, res, next)=>{
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name + 
             ' with details: ' + req.body.description);
    })
    .delete((req, res, next)=>{
        res.end('Deleting leader: ' + req.params.leaderId);
    });

    
module.exports = leaderRouter;
