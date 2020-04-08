const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false}, async (email, password, done) => {
      User.findOne({'email': email}, async (err, user) => {
        if (!user) done(null, false, 'Нет такого пользователя');
        if (user.verificationToken) {
          return done(null, false, 'Подтвердите email');
        }
        const isValid = await user.checkPassword(password);
        if (!isValid) done(null, false, 'Неверный пароль');
        done(null, user);
      });
    }
);
