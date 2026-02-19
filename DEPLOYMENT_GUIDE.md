# Deployment Guide - Mentor-Pro

This guide outlines the steps to deploy the Mentor-Pro application to Vercel.

## Prerequisites

-   **GitHub Repository**: Ensure your project is pushed to a GitHub repository.
-   **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
-   **Database**: A hosted MariaDB/MySQL database (e.g., Aiven, PlanetScale, or a VPS).

## Environment Variables

You must configure the following environment variables in your Vercel project settings:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | Connection string for your MariaDB/MySQL database. | `mysql://user:password@host:port/database` |
| `NEXTAUTH_SECRET` | A random string used to hash tokens. | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | The canonical URL of your site. | `https://your-project.vercel.app` |

## Deployment Steps

1.  **Login to Vercel**: Go to your Vercel dashboard.
2.  **Add New Project**: Click **"Add New..."** -> **"Project"**.
3.  **Import Git Repository**: Select your `Student_mentoring_system` repository.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: Ensure this is set to the folder containing `package.json` (e.g., `Student_mentoring_system` if it's in a subdirectory, or `./` if at root).
    *   **Environment Variables**: Expand the section and add the variables listed above.
5.  **Deploy**: Click **"Deploy"**.

## Post-Deployment

1.  **Database Migration**: Vercel effectively builds your project. If you need to apply Prisma migrations, you can run a custom build command or separate pipeline.
    *   *Recommended*: Connect to your database locally or via a script to run `npx prisma db push` or `npx prisma migrate deploy` to ensure the schema is up to date *before* the new deployment goes live, or as part of the build command if the database is accessible.
    *   **Build Command Override**: `npx prisma generate && next build` (This is usually default behavior for Prisma + Next.js on Vercel).

2.  **Verify**: Visit the deployed URL and log in to test functionality.

## Troubleshooting

-   **Database Connection**: Ensure your database allows connections from Vercel's IP addresses (allow 0.0.0.0/0 or use a trusted proxy).
-   **Prisma Client**: If you see errors related to Prisma Client, try redeploying with "Redeploy" -> "Clear Cache".
