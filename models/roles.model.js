module.exports = (sequelize, type) => {
    return sequelize.define('roles', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: type.STRING,
        priority:{
            type:type.INTEGER,
        },
        isDeleted: {
            type: type.BOOLEAN,
            defaultValue: false
        }
    });
};