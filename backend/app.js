const express = require('express')
const app = express()
const port = 3000

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config()

const logger = require('morgan');


const cors = require('cors');


const sequelize = require('./util/database')

const fileRouter = require('./routes/file');
const authRouter = require('./routes/auth');


app.use(cors());

app.use(logger('dev'));
app.use(express.json());


app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/auth', authRouter);
app.use('/file', fileRouter);


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: "Something went wrong"});
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


sequelize.sync().then(result => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })  
})
