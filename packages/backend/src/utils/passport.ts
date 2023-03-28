import process from 'process';
import { User } from '../entities/user.entity';
import { IUser } from '../types/entities.type';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secretKey,
};

export let currentUser: IUser | undefined = undefined;

interface IJwtPayload {
	sub: number;
	exp: number;
}

const jwtStrategy = new JwtStrategy(options, async (jwtPayload: IJwtPayload, done: CallableFunction) => {
	if (!jwtPayload.exp || Date.now() >= jwtPayload.exp) return done(null, false);
	if (!jwtPayload.sub) return done(null, false);

	const user = await User.findOne({
		where: {
			id: jwtPayload.sub,
		},
	});

	if (!user) return done(null, false);
	currentUser = user;
	return done(null, user);
});

passport.use(jwtStrategy);

export const generateToken = (userId: number) => {
	const signData: IJwtPayload = {
		sub: userId,
		exp: Date.now() + Number(process.env.JWT_EXPIRATION),
	};
	return `Bearer ${jwt.sign(signData, secretKey)}`;
};

export const auth = passport.authenticate('jwt', { session: false });
