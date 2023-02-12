import * as dotenv from 'dotenv';

dotenv.config();
const env: any = process.env;

interface EnvironmentInterface {
  mongodb: string;
  secretkey: string;
  user: string;
  password: string;
  verificationUrl: string;
}

export const environment: EnvironmentInterface = {
  mongodb: env.MONGODB_URL,
  user: env.AUTH_USER,
  password: env.AUTH_PASSWORD,
  secretkey: env.JWT_SECRET_Key,
  verificationUrl: env.VERIFICATION_URL,
};
