import { DataSource } from 'typeorm';

const connectDB = async () => {
	try {
		const AppDataSource = new DataSource({
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			type: 'postgres',
			entities: ['dist/entities/*.entity.{ts,js}'],
			migrations: ['dist/migrations/**/*.{ts,js}'],
			subscribers: ['src/subscriber/**/*.ts'],
			database: process.env.POSTGRES_DB,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			synchronize: true,
		});
		await AppDataSource.initialize();
		console.warn('PostgreSQL Connected...');
	} catch (err: any) {
		console.error(err.message);
		process.exit(1);
	}
};

export default connectDB;
