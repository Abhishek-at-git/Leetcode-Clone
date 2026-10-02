# LeetCode Clone 🚀

A modern, fully-featured LeetCode clone built with Next.js, Prisma, and Judge0. This platform allows users to solve coding problems, run and test code against multiple test cases, track their statistics, and organize problems into custom playlists.

## 🌟 Features

- **Interactive Code Editor:** Write and execute code in multiple languages (Python, JavaScript, Java, C++, etc.).
- **Code Execution Engine:** Integrated with Judge0 API to compile, run, and validate user solutions against hidden test cases.
- **User Authentication:** Secure signup, login, and session management using Clerk.
- **Problem Management:** Admins can create and manage coding problems, test cases, and difficulty levels.
- **User Profiles:** Detailed user profiles tracking solved problems, success rates, and submission history.
- **Playlists:** Users can organize their favorite problems into customizable playlists.
- **Modern UI:** Built with Tailwind CSS and Shadcn UI for a beautiful, responsive, and accessible interface.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Shadcn UI
- **Backend:** Next.js Server Actions, API Routes
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** Clerk
- **Code Execution:** Judge0 (RapidAPI)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed. You will also need a PostgreSQL database and API keys for Clerk and Judge0.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/leetcode-clone.git
cd leetcode-clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env` file in the root directory and add the following keys:
```env
# Database (PostgreSQL)
DATABASE_URL="your_database_url_here"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Judge0 Code Execution (RapidAPI)
RAPIDAPI_KEY="your_rapidapi_key"
RAPIDAPI_HOST="judge0-ce.p.rapidapi.com"
```

### 4. Database Migration
Push the Prisma schema to your database:
```bash
npx prisma db push
# Or if you use migrations:
npx prisma migrate dev
```

### 5. Seed the Database
To populate your database with a few starter problems (e.g., Two Sum, Reverse Linked List), run the seed script:
```bash
npx tsx seed.ts
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗄️ Database Management
You can easily view and manage your database records using Prisma Studio:
```bash
npx prisma studio
```

## 📝 License
This project is licensed under the MIT License.
