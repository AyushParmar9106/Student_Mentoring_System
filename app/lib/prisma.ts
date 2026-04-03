import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  connectionLimit: 5,
  connectTimeout: 10000,
  ssl: { rejectUnauthorized: true, minVersion: 'TLSv1.2' },
});
const prisma = new PrismaClient({ adapter });

export { prisma };