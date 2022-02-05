const {User} = require('../sequelize');

exports.checkEmailExist = (email,done)=>{
   User.findAll({where:{email:email}}).then((user)=>{
        if(user.length===0)
        {
           done(null,'true')
        }
        else
        {
            done('false',null)
        }
    })
};

exports.getUserById=(body,done)=>{
    return User.findAll({ where: { isDeleted: false, email: body.email } }).then((user) => {
        done(null,user)
    }).catch((err) => {
        done(err,null)
    });
}