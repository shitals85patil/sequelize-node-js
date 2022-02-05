const { Router } = require('express');
const _ = require('lodash');
const passwordHash = require('password-hash')
const router = Router();
// const sequelize = require('sequelize');
const { User, Role } = require('../sequelize');
const {checkEmailExist,getUserById} = require('../controller/user.controller');
// const { Op } = sequelize;

router.post('/user', (req, res) => {
    if (_.isEmpty(req.body) || (req.body.name === '' || req.body.email === '' || req.body.password === '' || req.body.gender === '')){
        res.status(400).send({ error: 'All fields are required' });
    }
    else {
       return checkEmailExist(req.body.email,(err,result)=>{
            if(err){
                console.log("error==",err)
               res.status(400).send(err)
            }
            else
            {
                console.log("result===",result)
                res.status(200).send(result)
            }
        });
        const user = new User();
        debugger;
        user.name = req.body.name;
        user.email = req.body.email;
        user.gender = req.body.gender;
        user.password = passwordHash.generate(req.body.password);
        user.roleId=req.body.roleId

        return user.save().then((u) => {
            res.json(u).status(200);
        }).catch((err) => {
            res.json({ error: JSON.stringify(err) }).status(400);
        });
    }
});

//Get All Users................................
router.get('/users', (req, res) => {
    User.findAll({ where: { isDeleted: false },
                order: [['name', 'DESC']],include:[{model:Role}]}).then((user) => {
        res.json(user).status(200);
    }).catch((err) => {
        res.json({ error: JSON.stringify(err) }).status(400);
    });
});

router.get('/users/:id', (req, res) => {
    User.findAll({ where: { isDeleted: false, id: req.params.id } }).then((user) => {
        res.json(user).status(200);
    }).catch((err) => {
        res.json({ error: JSON.stringify(err) }).status(400);
    });
});

router.put('/user/:id', (req, res) => {
    const { id } = req.params;
    return User.update(req.body, { where: { id } }).then((user) => {
        res.json(user).status(200);
    }).catch((err) => {
        res.json({ error: JSON.stringify(err) }).status(400);
    });
});

router.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    return User.update({ isDeleted: true }, { where: { id } }).then((user) => {
        res.json(user).status(200);
    }).catch((err) => {
        res.json({ error: JSON.stringify(err) }).status(400);
    });
});

router.post('/users/get/email', (req, res) => {
    return getUserById(req.body,(err,result)=>{
        if(err){
            res.status(400).send(err)
        }
        else
        {
            res.status(200).send(result)
        }
    })

});


module.exports = router;