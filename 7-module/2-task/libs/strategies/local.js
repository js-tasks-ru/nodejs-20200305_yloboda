const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
  {usernameField: 'email', session: false},
  function(email, password, done) {
    done(a ,null, false, 'Стратегия подключена, но еще не настроена');
  }
);
