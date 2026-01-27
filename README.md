
# Project Setup Guide

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), and it uses the following tools and technologies:

- [pnpm](https://pnpm.io/) – package manager
- [TypeScript](https://www.typescriptlang.org/) – static typing
- [Tailwind CSS](https://tailwindcss.com/) – utility-first CSS framework
- [ESLint](https://eslint.org/) – code linting and formatting

## Prerequisites

Before running the project, make sure the following are installed on your machine:

### 1. Node.js

- **Recommended version:** `18.x` or higher  
- Download and install from: [https://nodejs.org/](https://nodejs.org/)

To verify installation:

```bash
node -v
```

### 2. pnpm (Package Manager)
This project uses pnpm instead of npm or yarn.

To install pnpm globally:

```bash
npm install -g pnpm
```

To verify installation:

```bash
pnpm -v
```

### 3. Git

Git is required to clone this repository locally. 

Download and install from: https://git-scm.com/ 


## Getting Started

Once all prerequisites are installed, select a folder to clone this repository, open the command prompt on it
and paste the following bash to clone it:

```bash
git clone https://github.com/RachelS2/familink.git
cd <your-project-folder>
```

### Install dependencies
```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

# Optional but Recommended
## VS Code Extensions

    ESLint – For inline linting and formatting

    Tailwind CSS IntelliSense – Autocompletion and syntax highlighting for Tailwind

    Prettier – Code formatter

    TypeScript – Language support and error checking

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
