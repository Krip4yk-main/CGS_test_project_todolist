import { User } from '../entities/user.entity';
import { IUser } from '../types/entities.type';

export default class UserService {
	async findAll() {
		return await User.find();
	}

	async findById(id: number) {
		return await User.findOne({
			where: {
				id: id,
			},
		});
	}

	async findByEmail(email: string) {
		return await User.findOne({
			where: {
				email: email,
			},
		});
	}

	async register(userData: IUser) {
		return await User.insert({
			email: userData.email,
			password: userData.password,
		});
	}

	async forgot(userData: IUser, userToUpdate: IUser) {
		return await User.save({
			...userToUpdate,
			...userData,
		});
	}

	async delete(id: number) {
		return await User.delete({
			id: id,
		});
	}

	async update(userData: IUser, userToUpdate: User) {
		return await User.update(
			{
				id: userData.id,
			},
			{
				email: userData.email ? userData.email : userToUpdate.email,
				password: userData.password,
			}
		);
	}

	async login(userData: IUser) {
		return await User.findOne({
			where: {
				email: userData.email,
			},
		});
	}
}
