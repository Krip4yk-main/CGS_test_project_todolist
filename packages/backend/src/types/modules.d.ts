declare global {
	namespace NodeJS {
		interface ProcessEnv {
			JWT_SECRET: string;
			JWT_EXPIRATION: string;
		}
	}
}

export {};
