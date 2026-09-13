# Web OS - Modern Desktop Environment

A modern, high-performance Web Operating System built with React, TypeScript, Tailwind CSS, and Zustand, featuring an AI Voice Assistant powered by Groq.

## Features

- **Windows-Style Desktop Environment**: Draggable windows, taskbar, start menu, system tray.
- **Window Management**: Maximize, minimize, drag, dynamic z-indexing via `framer-motion`.
- **Integrated App Ecosystem**:
  - **YouTube**: Search and play videos via embedded iframe.
  - **Browser**: Working web browser simulator.
  - **Settings**: Change system language (i18n) and switch between Dark/Light mode.
  - **File Explorer**: Browse simulated files and folders.
- **AI Voice Assistant (Groq)**: Uses Web Speech API to listen to your voice and translates intents (like "Open YouTube" or "Switch to dark mode") into actual OS commands using Groq's fast LLM function calling.

## Prerequisites

- Node.js 18+ installed on your machine.

## Getting Started

1. **Install Dependencies**
   Run the following command to install all necessary packages:
   ```bash
   npm install
   ```

2. **Configure Environment Variables (API Keys)**
   To enable the Voice Assistant, you need a Groq API Key.
   - Rename the `.env.example` file to `.env` (or create a new `.env` file in the root directory).
   - Add your Groq API key:
     ```env
     VITE_GROQ_API_KEY=gsk_your_actual_api_key_here
     ```

3. **Run the Development Server**
   Start the Vite dev server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Deployment to GitHub & Vercel

### Step 1: Push to GitHub
1. Initialize a git repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial Web OS commit"
   ```
2. Create a new repository on GitHub and push the code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New** > **Project** and import your newly created GitHub repository.
3. In the **Configure Project** settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - Add a new variable named `VITE_GROQ_API_KEY` and paste your actual Groq API key as the value.
5. Click **Deploy**. Vercel will build and host your Web OS!

## Tech Stack
- React (Vite)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Lucide React
- i18next
- Groq SDK
