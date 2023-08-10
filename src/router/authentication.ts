import express from 'express';
import passport from 'passport';

import { login, register } from '../controller/authentication';
import {callback,profile} from '../controller/authentication'
export default (router:express.Router) =>{
    router.post('/auth/register',register)
    router.post('/auth/login',login)
    router.get('/auth/google', passport.authenticate("google", { scope: ["email", "profile"] }))
    router.get('/auth/google/callback', passport.authenticate("google", { session: false }),callback);
    router.get('/profile',profile)
};

