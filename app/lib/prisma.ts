import { PrismaMariaDb } from "@prisma/adapter-mariadb";
<<<<<<< HEAD
import { PrismaClient } from "../generated/prisma/client";
=======
import { PrismaClient } from "@prisma/client";
>>>>>>> d282a3810cbf7cbc9068d4230e349a3be90eecd7

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
<<<<<<< HEAD
});

=======
  connectionLimit: 5,
});

// The connection is handled by the adapter, not a URL string
>>>>>>> d282a3810cbf7cbc9068d4230e349a3be90eecd7
const prisma = new PrismaClient({ adapter });

export { prisma };