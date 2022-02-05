
module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: type.STRING,
        password: type.STRING,
        name: type.STRING,
        roleId:{
            type:type.INTEGER,
            allowNull:false
        },
        isDeleted: {
            type: type.BOOLEAN,
            defaultValue: false
        }
    });
};