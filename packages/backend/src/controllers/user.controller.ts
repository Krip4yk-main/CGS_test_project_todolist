import { Response } from 'express';
import UserService from '../services/user.service';
import { IUser } from '../types/entities.type';
import { AES, enc } from 'crypto-ts';
import { ITypedRequest } from '../types/request.type';
import { currentUser, generateToken } from '../utils/passport';

export class UserController {
	constructor(private userService: UserService) {}

	async getAllUser(_req: ITypedRequest<IUser>, _res: Response) {
		return await this.userService.findAll();
	}

	async getById(req: ITypedRequest<IUser>, _res: Response) {
		if (!req.body.id) {
			throw new Error('Missed id');
		}
		return await this.userService.findById(req.body.id);
	}

	async register(req: ITypedRequest<IUser>, _res: Response) {
		if (!req.body.email || !req.body.password) {
			throw new Error('Missed email or password');
		}

		const isExist = await this.userService.findByEmail(req.body.email);
		if (isExist) {
			throw new Error('User already exist! Try to login');
		}

		if (!this.passwordValidator(req.body.password)) {
			throw new Error(
				'Password must contain at least 1 small letter (a-z), ' +
					'1 big letter (A-Z), 1 number (0-9) and have 8 or more length'
			);
		}

		req.body.password = AES.encrypt(req.body.password, this.getAESKey(req.body.email)).toString();

		const result = await this.userService.register(req.body);

		const bearer = generateToken(result.identifiers[0].id);

		return { bearer: bearer, userId: result.identifiers[0].id };
	}

	async forgot(req: ITypedRequest<IUser>, _res: Response) {
		if (!req.body.email || !req.body.password) {
			throw new Error('Missed email or password');
		}

		const userToUpdate = await this.userService.findByEmail(req.body.email);
		if (!userToUpdate) {
			throw new Error('User missed! Try to register');
		}

		if (!this.passwordValidator(req.body.password)) {
			throw new Error(
				'Password must contain at least 1 small letter (a-z), ' +
					'1 big letter (A-Z), 1 number (0-9) and have 8 or more length'
			);
		}

		req.body.password = AES.encrypt(req.body.password, this.getAESKey(req.body.email)).toString();

		return await this.userService.forgot(req.body, userToUpdate);
	}

	async delete(_req: ITypedRequest<IUser>, _res: Response) {
		if (!currentUser || !currentUser.id) {
			throw new Error('Missed user');
		}
		return await this.userService.delete(currentUser.id);
	}

	async update(req: ITypedRequest<IUser>, _res: Response) {
		if (!currentUser || !currentUser.id) {
			throw new Error('Missed user');
		}
		if (!(req.body.email || req.body.password)) {
			throw new Error('Missed data');
		}
		req.body.id = currentUser.id;

		const userToUpdate = await this.userService.findById(req.body.id);
		if (!userToUpdate) {
			throw new Error('Missed user');
		}

		if (req.body.password && !this.passwordValidator(req.body.password)) {
			throw new Error(
				'Password must contain at least 1 small letter (a-z), ' +
					'1 big letter (A-Z), 1 number (0-9) and have 8 or more length'
			);
		}

		if (req.body.password) {
			req.body.password = AES.encrypt(
				req.body.password,
				this.getAESKey(req.body.email ? req.body.email : userToUpdate.email)
			).toString();
		}

		if (req.body.email && !req.body.password) {
			const oldPass = AES.decrypt(userToUpdate.password, this.getAESKey(userToUpdate.email)).toString(enc.Utf8);
			req.body.password = AES.encrypt(oldPass, this.getAESKey(req.body.email)).toString();
		}

		return await this.userService.update(req.body, userToUpdate);
	}

	async login(req: ITypedRequest<IUser>, _res: Response) {
		if (!req.body.email || !req.body.password) {
			throw new Error('Missed email or password');
		}

		const result = await this.userService.login(req.body);

		if (
			!result ||
			AES.decrypt(result.password, this.getAESKey(req.body.email)).toString(enc.Utf8) != req.body.password
		) {
			throw new Error('Invalid login');
		}

		const bearer = generateToken(result.id);

		return { bearer: bearer, userId: result.id };
	}

	private passwordValidator(password: string) {
		const reg = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
		return reg.test(password);
	}

	private getAESKey(email: string) {
		return email + email.split('').reverse().join('');
	}
}

const userController = new UserController(new UserService());
export default userController;
