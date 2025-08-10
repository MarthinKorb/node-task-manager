import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

const AppDataSource = new DataSource({
    type: isTest ? 'sqlite' : 'postgres',
    database: isTest ? ':memory:' : process.env.DATABASE || 'default',
    host: isTest ? undefined : 'localhost',
    port: isTest ? undefined : 5432,
    username: isTest ? undefined : process.env.USER || 'default',
    password: isTest ? undefined : process.env.PASSWORD || 'default',
    schema: isTest ? undefined : process.env.SCHEMA || 'tasks_manager',
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entities/*.{js,ts}"],
    migrations: [],
    subscribers: [],
});

export async function initializeDatabase() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

export function getRepository(entity: any) {
    return AppDataSource.getRepository(entity);
}

export { AppDataSource };

