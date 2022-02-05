const { Router } = require('express');
var _ = require('lodash');

const router = Router();
// const sequelize = require('sequelize');
const { Role } = require('../sequelize');

// const { Op } = sequelize;


//Get All Roles................................
router.get('/roles', (req, res) => {
    Role.findAll({ where: { isDeleted: false }}).then((user) => {
        res.json(user).status(200);
    }).catch((err) => {
        res.json({ error: JSON.stringify(err) }).status(400);
    });
});

router.post('/save/roles', (req, res) => {
    let role=new Role(req.body)
    role.save().then((response)=>{
        res.json(response).status(200);
    }).catch((err)=>{
        res.json(err).status(400);
    })
});

module.exports = router;