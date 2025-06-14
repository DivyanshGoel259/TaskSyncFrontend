# TaskSyncFrontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Folder Navigation](#folder-navigation)
- [Configuration](#configuration)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/) as a package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd TaskSyncFrontend/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` (if available) and fill in the required values.
   - If `.env.example` is not present, create a `.env` file in the root and add your environment variables as needed.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
frontend/
├── .env                  # Environment variables
├── .gitignore
├── components.json       # UI library config (shadcn/ui)
├── eslint.config.mjs     # ESLint configuration
├── next-env.d.ts         # Next.js TypeScript types
├── next.config.ts        # Next.js configuration
├── package.json
├── postcss.config.mjs    # PostCSS configuration
├── README.md
├── tsconfig.json         # TypeScript configuration
├── types.ts              # Global TypeScript types
├── app/                  # Next.js app directory (routing, pages, layouts)
├── components/           # Reusable React components
├── lib/                  # Utility functions, API clients, hooks, etc.
├── public/               # Static assets (images, favicon, etc.)
└── .next/                # Next.js build output (auto-generated)
```

---

## Available Scripts

- `dev` – Runs the app in development mode.
- `build` – Builds the app for production.
- `start` – Starts the production server.
- `lint` – Runs ESLint for code quality checks.

Example usage:

```bash
npm run build
npm start
```

---

## Folder Navigation

- **`app/`**  
  Contains all route handlers, pages, layouts, and API routes using the Next.js App Router.

  - `app/page.tsx`: Main landing page.
  - `app/layout.tsx`: Root layout for the app.

- **`components/`**  
  Shared and UI components used throughout the app.  
  Organized by feature or type.

- **`lib/`**  
  Utility functions, custom hooks, API clients, and other shared logic.

- **`public/`**  
  Static files served at the root URL. Place images, icons, and other assets here.

- **`types.ts`**  
  Global TypeScript type definitions.

- **`components.json`**  
  Configuration for [shadcn/ui](https://ui.shadcn.com/) (UI component library).

- **`.env`**  
  Environment variables for local development.

---

## Configuration

- **UI Library:**  
  Uses [shadcn/ui](https://ui.shadcn.com/) with the "new-york" style and [lucide](https://lucide.dev/) icons.  
  Tailwind CSS is configured via `postcss.config.mjs` and referenced in `components.json`.

- **TypeScript:**  
  Strictly typed with configuration in `tsconfig.json`.

- **ESLint:**  
  Linting rules are defined in `eslint.config.mjs`.

- **Fonts:**  
  Uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for automatic font optimization (e.g., [Geist](https://vercel.com/font)).

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – Interactive Next.js tutorial.
- [shadcn/ui Documentation](https://ui.shadcn.com/docs) – UI component library used in this project.

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Contributing

Feel free to open issues or pull requests for improvements and bug fixes.

---

## License

Specify your license here (e.g., MIT, Apache 2.0, etc.).

---
