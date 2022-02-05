const Sequelize = require('sequelize');
const _ = require('lodash');
const faker = require('faker');
const config = require('./config/database');
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const RoleModel = require('./models/roles.model');
const UserModel = require('./models/users.model');

const Role = RoleModel(sequelize,Sequelize);
const User = UserModel(sequelize, Sequelize);

User.belongsTo(Role,{foreignKey:'roleId'});
Role.hasOne(User,{foreignKey:'roleId'})

sequelize.sync({ force: false }).then(() => {
    console.log('Users db and user table have been created');
     // _.times(2, () => {
     // return User.create({
     // name: faker.name.findName(),
     // email: faker.internet.email(),
     // roleId:2
     // })
     // })
});

sequelize.authenticate().then(()=>{
    console.log('Mysql connection has been established successfully.');
}).catch(()=>{
    console.log('Mysql connection has been established successfully.');
})


module.exports = { User, Role };
