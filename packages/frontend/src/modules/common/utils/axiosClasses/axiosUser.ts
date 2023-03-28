import axios, { AxiosInstance } from 'axios';
import { BACKEND_KEYS, CookieType, getCookie } from '../../consts/app-keys.const';
import { IAxiosReq, IBearer, IUserReq, StatusNames } from '../../types/request.types';
import { IUser } from '../../types/entities.types';

class AxiosUser {
	private axiosClient: AxiosInstance;

	constructor() {
		this.axiosClient = axios.create({
			baseURL: BACKEND_KEYS.USER_API,
			responseType: 'json',
			headers: {
				'content-type': 'application/json',
			},
		});
	}

	public async login(data: IUserReq) {
		// here could be logic for next tasks
		return this.postCall<IUserReq, IBearer>('/login', data);
	}

	public async forgot(data: IUserReq) {
		// here could be logic for next tasks
		return this.postCall<IUserReq, IUser>('/forgot', data);
	}

	public async register(data: IUserReq) {
		// here could be logic for next tasks
		return this.postCall<IUserReq, IBearer>('/register', data);
	}

	private async postCall<T, G>(path: string, data: T) {
		try {
			const result: IAxiosReq<G> = await this.axiosClient.post(path, data, {
				headers: { Authorization: getCookie(CookieType.auth) },
			});
			if (!result) return null;
			if (!result.data || !result.data.data) return null;
			return result.data.data;
		} catch (err: any) {
			if (err.response.status == 401) return StatusNames.Unauthorized;
			console.error(err.message);
			return null;
		}
	}
}

const axiosUser = new AxiosUser();
export default axiosUser;
