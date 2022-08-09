import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') }); // prettier-ignore

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
