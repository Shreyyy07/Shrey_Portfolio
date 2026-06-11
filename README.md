# Shrey Joshi — Full Stack Developer Portfolio

Welcome to the source code of my personal portfolio and developer cockpit! This project isn't just a static resume—it's a fully interactive web application built with a premium, dynamic aesthetic and powerful integrations.

## ✨ Features

- **Recruiter Mode (⌘K / Ctrl+K)**: Instantly toggles the entire website from an immersive, animated 3D experience into a clean, highly scannable classic PDF-style résumé tailored specifically for recruiters.
- **"Rob" — AI Voice Assistant**: A custom-built, floating voice assistant that uses the Web Speech API to answer questions about my background, skills, and projects in real-time.
- **Dynamic Content Feeds**: Uses Server-Side Rendering (SSR) and Server Functions to fetch my latest YouTube videos and Medium articles directly via RSS without CORS issues or manual updates.
- **GitHub Heatmap**: A live representation of my GitHub contributions built natively without relying on heavy external iframes.
- **3D & Micro-Animations**: Built with `three.js` (for the background sphere), Framer Motion, and Tailwind CSS for fluid, glassmorphic UI interactions.
- **Web3Forms Integration**: A fully functional, serverless contact form that delivers messages straight to my inbox.

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-Stack React Framework)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphism utilities
- **Icons**: [Lucide React](https://lucide.dev/) & Custom SVGs
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & Three.js
- **Tooling**: [Vite](https://vitejs.dev/) & TypeScript

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shreyyy07/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   *The app will be available at `http://localhost:5173`.*

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🌐 Deployment

This project is fully optimized for zero-configuration deployment on **Vercel**. 
Because it uses TanStack Start's `createServerFn` to bypass CORS for YouTube/Medium fetching, Vercel automatically deploys the frontend statically and handles the server functions as ultra-fast Serverless Functions.

## 📬 Contact

- **Email**: shreyjoshi100@gmail.com
- **LinkedIn**: [shrey-joshi-1b038a249](https://www.linkedin.com/in/shrey-joshi-1b038a249/)
- **GitHub**: [Shreyyy07](https://github.com/Shreyyy07)

---
*Designed & Built by Shrey Joshi.*
