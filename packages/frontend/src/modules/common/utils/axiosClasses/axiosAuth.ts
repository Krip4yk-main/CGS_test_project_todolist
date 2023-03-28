import axios, { AxiosInstance } from 'axios';
import { BACKEND_KEYS, CookieType, getCookie } from '../../consts/app-keys.const';
import { IAxiosReq, StatusNames } from '../../types/request.types';

class AxiosAuth {
	private axiosClient: AxiosInstance;

	constructor() {
		this.axiosClient = axios.create({
			baseURL: BACKEND_KEYS.BASE_URL,
			responseType: 'json',
			headers: {
				'content-type': 'application/json',
			},
		});
	}

	public async bearerAuth() {
		try {
			const result: string | IAxiosReq<number> = await this.axiosClient.get('/protectedTest', {
				headers: { Authorization: getCookie(CookieType.auth) },
			});
			if (!result) return null;
			return result;
		} catch (err: any) {
			if (err.response.status == 401) return StatusNames.Unauthorized;
			console.error(err);
			return null;
		}
	}
}

const axiosAuth = new AxiosAuth();
export default axiosAuth;
