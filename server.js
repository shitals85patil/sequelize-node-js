const { User, Role } = require('./sequelize');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const userRoute = require('./router/user.router');
const roleRoute = require('./router/role.router');

app.use(cors());
app.use(bodyParser());
app.use(userRoute,roleRoute);

const PORT = process.argv[2];
app.listen(5000, () => {
    console.log(`Server ready at ${5000}`);
});