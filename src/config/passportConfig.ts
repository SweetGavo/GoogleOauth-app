import PassportGoogle from 'passport-google-oauth2'
import express from 'express'
import { UserModel } from 'db/user'

const GoogleStrategy = PassportGoogle.Strategy

export const passportConfig = (passport:any) =>{

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback : true
      },
      async (request:express.Request, accessToken:any, refreshToken:any, profile:any, done:any) => {
        try {
            let existingUser = await UserModel.findOne({ 'google.id': profile.id });
            if (existingUser) {
              return done(null, existingUser);
            }

            console.log('Creating new user...');
            const newUser = new UserModel({
              method: 'google',
              google: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
              }
            });
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
      }
    ));
}

