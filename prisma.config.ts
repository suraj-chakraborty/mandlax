import { defineConfig } from "prisma/config";
import * as dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
    schema: './app/prisma/schema.prisma',
    earlyAccess: true
});
