import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import dotenv from 'dotenv';
import { User } from '#models/schemas/user.js';

dotenv.config();
const { secret } = process.env;
const options = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JWTStrategy(options, async function (payload, done) {
    User.findOne({ email: payload.email })
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(error => done(error));
  })
);
