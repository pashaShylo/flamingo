# 🦩 Flamingo Task Manager

A modern full-stack task management application built with Next.js, featuring Google OAuth authentication and real-time CRUD operations.

## 🚀 Live Demo

**[View Live Application](https://flamingo-two-gamma.vercel.app)**

##  Getting Started

### Prerequisites

- Node.js 20+ and npm/pnpm
- PostgreSQL database (or Neon account)
- Google OAuth credentials

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/pashaShylo/flamingo
cd flamingo
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Fill in the required variables:

```env
# Database connection string (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# NextAuth secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Node environment
NODE_ENV="development"
```

### Setting up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth Client ID**
5. Set application type to **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for local development)
   - `https://your-domain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret to your `.env` file

### Database Setup

1. **Create a Neon database** 
   - Sign up at [Neon](https://neon.tech)
   - Create a new project
   - Copy the connection string to `DATABASE_URL`

2. **Run Prisma migrations**
```bash
npx prisma generate
npx prisma db push
```

3. **(Optional) Seed the database**
```bash
npx prisma db seed
```

### Running Locally

1. **Start the development server**
```bash
npm run dev
```

2. **Open your browser**
```
http://localhost:3000
```

3. **Sign in with Google** and start managing tasks!

## 📋 Features

- **SSO Authentication**: Secure Google OAuth 2.0 integration via NextAuth.js
- **CRUD Operations**: Create, read, update, and delete tasks
- **Task Management**: 
  - Multiple status levels (TODO, IN_PROGRESS, DONE)
  - Priority levels (LOW, MEDIUM, HIGH, URGENT)
  - Rich task descriptions
- **Modern UI**: Built with React, TailwindCSS components
- **Real-time Updates**: Server actions for seamless data synchronization
- **Type Safety**: Full TypeScript implementation with Zod validation

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **UI Components**: Custom components with Lucide React icons
- **Forms**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes & Server Actions
- **Authentication**: NextAuth.js v5 with Google Provider
- **Database**: PostgreSQL (hosted on Neon)
- **ORM**: Prisma 7.0

### Deployment
- **Frontend**: Vercel
- **Database**: Neon Serverless PostgreSQL

## 📁 Project Structure

```
flamingo-full-stack/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components (header, footer)
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   └── constants/        # App constants
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma     # Database schema
├── actions/              # Server actions for CRUD
├── services/             # Business logic layer
└── types/                # TypeScript type definitions
```

## 🏗️ Architecture & Design Decisions

### Why Next.js 16?
- **App Router**: Modern routing with server components for better performance
- **Server Actions**: Simplified data mutations without API routes
- **Built-in optimization**: Image optimization, font loading, and code splitting

### Why NextAuth.js?
- Industry-standard authentication library
- Easy OAuth provider integration
- Secure session management
- Prisma adapter for database integration

### Why Prisma?
- Type-safe database queries
- Easy migrations and schema management
- Excellent TypeScript support
- Perfect integration with Next.js and PostgreSQL

### Why Neon PostgreSQL?
- Serverless PostgreSQL with autoscaling
- Free tier suitable for development
- Excellent performance and reliability
- Easy integration with Vercel

### Database Schema Design

The application uses a normalized schema with:
- **User**: Stores user profiles from OAuth
- **Account/Session**: NextAuth session management
- **Task**: Main entity with user relationship
  - Enum-based status and priority for data integrity
  - Soft delete capability via user cascade

## 📝 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## 🔐 Security Considerations

- All routes protected with NextAuth middleware
- CSRF protection enabled by default
- Environment variables for sensitive data
- SQL injection prevention via Prisma
- Secure session handling with httpOnly cookies