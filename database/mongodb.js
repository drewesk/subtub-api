import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
    throw new Error("Please define the DB_URI environment var inside .env.<production/development>.local.");
    
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Connected to DB in ${NODE_ENV} mode`);
    } catch (error) {
        console.log('Error connecting to DB: ', error);
        
        process.exit(1);
    }
}

export default connectDB;