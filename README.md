## EcoSpark-Hub Client
The frontend application for EcoSpark-Hub, a community-driven platform for eco-friendly innovations. Built with Next.js 16 and React 19, it provides a high-performance, accessible, and visually engaging experience for users to share and support sustainability ideas.

## Role-Based Login
**Admin Credentials:**
```text
- **Email:** `nishanchowdhury4130@gmail.com`
- **Password:** `Nishan@12
```

## 🚀 Live Links
* **Frontend Application:** [https://ecospark-hub-client.vercel.app](https://ecospark-hub-client.vercel.app)
* **Backend API:** [https://eco-spark-hub-server-wine.vercel.app](https://eco-spark-hub-server-wine.vercel.app)

## ✨ Key Features
* Modern UI/UX: Built with Shadcn/ui and Tailwind CSS 4 for a clean, responsive, and accessible design.
* Smooth Animations: Interactive elements and page transitions powered by Framer Motion.
* State Management & Data Fetching: Efficient server-state management using TanStack Query (React Query) for caching and optimistic updates.
* Dynamic Dashboards: Real-time sustainability metrics and data visualization using Recharts.
* Secure Auth Integration: Seamless client-side authentication handled via Better-Auth.
* Type-Safe Forms: Advanced form handling and validation using TanStack Form and Zod.
* Optimized Performance: Utilizing Next.js 16 features like Server Components and the Bun runtime for lightning-fast builds.

## 🛠 Technologies Used
Framework: Next.js 16 (App Router)
* Library: React 19
* Styling: Tailwind CSS 4, Lucide React (Icons)
* Components: Shadcn/ui, Radix UI
* Data Fetching: TanStack Query & Axios
* Animations: Framer Motion
* Runtime/Package Manager: Bun

## ⚙️ Setup Instructions
Follow these steps to set up the client-side project locally:

1. Clone the repository:
```text
Bash
git clone https://github.com/your-username/EcoSpark-Hub-Client.git
cd EcoSpark-Hub-Client
```
3. Install dependencies:
```text
Bash
bun install
```
4. Start the development server:
```text
Bash
bun dev
```
## 📜 Available Scripts
```text
bun dev: Runs the app in development mode with hot-reloading.
bun build: Creates an optimized production build of the application.
bun start: Starts the production server.
bun lint: Runs ESLint to check for code quality and style issues.
```
## 📁 Architecture Highlight
The project follows a modular React architecture:
Components: Reusable UI elements built with Shadcn/ui.
Hooks: Custom logic and TanStack Query wrappers for data fetching.
Providers: Context providers for Theme, Auth, and Query Client.
Styles: Global styles utilizing the latest Tailwind CSS 4 features.
