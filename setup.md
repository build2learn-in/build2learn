## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/build2learn.git
   cd build2learn
   ```

2. Install dependencies:
   ```bash
   npm install --force
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and update the values
   - Make sure to set up your database connection string

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" and select "OAuth client ID"
5. Select "Web application" as the application type
6. Add your application name
7. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production URL (for production)
8. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
9. Click "Create"
10. Copy the Client ID and Client Secret to your `.env` file:
    ```
    GOOGLE_CLIENT_ID="your-client-id"
    GOOGLE_CLIENT_SECRET="your-client-secret"
    ```

## Environment Variables

The following environment variables are required:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/build2learn?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-which-should-be-generated"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email (for notifications)
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/build2learn?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="avengers-assemble"

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
SMTP_USER="user@gmail.com"
SMTP_PASS="google-appspecificpassword"
```

