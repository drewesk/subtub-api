import { config } from 'dotenv';

config({ 
    // eslint-disable-next-line no-undef
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
});

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI, 
    JWT_SECRET, 
    JWT_EXPIRES_IN,
    ARCJET_ENV,
    ARCJET_KEY,
    ADMIN_TOKEN,
    QSTASH_TOKEN,
    QSTASH_URL,
    SERVER_URL,
    EMAIL_PASSWORD
    
// eslint-disable-next-line no-undef
} = process.env;
