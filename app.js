const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const passport     = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy


// Comprobar que se conecta a la base de datos
mongoose.connect('mongodb://localhost/lab-coffee-books')
  .then(x => console.log(`Connected to Mongo! Database name`))
  .catch(err => console.error('Error connecting to mongo', err));


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
const User = require('./models/user');
const login = require('./routes/index');
const createplaces = require('./routes/index')


app.use('/', index);
app.use('/login', login);
app.use('/createplaces', createplaces)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// GOOGLE

passport.use(new GoogleStrategy ({
  clientID: '426716560354-9ctvi2rjo1o4cresni3i8agsft0h0dni.apps.googleusercontent.com',
  clientSecret: 'Cz_3r7L1sUv3wkL6krn6_GFh',
  callbackURL: 'http://localhost:3000/auth/google/callback'
  },

  function(acessToken, refreshToken, profile, done) {


    User.findOne({googleId: profile.id})
      .then(user => {
        if (user) {
          done(null, user)
          return
        }

        User.create({ googleId: profile.id })
        .then(newUser => { 
          done(null, newUser)
        })

        .catch(err => done(err))
      })

      .catch(err => done(err))

  }


))


module.exports = app;
