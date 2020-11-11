const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const mongoose = require("mongoose")

  app.use(
    session({
      secret: "our-passport-local-strategy-app",
      store: new MongoStore( { mongooseConnection: mongoose.connection }),
      resave: true,
      saveUninitialized: true
    })
  );

  module.exports = app
