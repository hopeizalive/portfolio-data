# Adil Rajput - AI Powered Portfolio

Professional portfolio for **Adil Rajput**, System Analyst and Team Lead. This application features an AI-driven chat assistant and voice-enabled conversational features powered by the Google Gemini API.

## 🚀 Local Development Setup

To run this project on your local machine, follow these steps:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed.

### 2. Setup Files
Create a new directory and copy all the project files (`index.html`, `App.tsx`, `constants.ts`, etc.) into it.

### 3. Initialize Project
Open your terminal in the project directory and run:

```bash
# Initialize npm
npm init -y

# Install Vite (for fast local development)
npm install -D vite

# Install project dependencies
# Since we use ESM modules from esm.sh, you don't strictly need 
# to install React/Lucide locally, but it's recommended for IDE support.
npm install react react-dom lucide-react @google/genai
```

### 4. Create Vite Configuration
Create a `vite.config.ts` file in your root:

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.API_KEY': JSON.stringify('YOUR_GOOGLE_GEMINI_API_KEY_HERE')
  }
});
```

*Note: Replace `YOUR_GOOGLE_GEMINI_API_KEY_HERE` with your actual API key from [Google AI Studio](https://aistudio.google.com/).*

### 5. Start Development Server
```bash
npx vite
```
The app will be available at `http://localhost:5173`.

---

## 🌐 Deployment

### Vercel / Netlify
1. Connect your repository to Vercel or Netlify.
2. **Environment Variable**: Add a variable named `API_KEY` with your Gemini API Key as the value.
3. **Build Command**: `npx vite build`
4. **Output Directory**: `dist`

### Security Note
When deploying, never commit your `API_KEY` directly to GitHub. Always use Environment Variables provided by your hosting platform.

---

## 🛠 Features
- **Voice AI**: Click the microphone icon in the chat widget to talk to the assistant using Gemini 2.5 Flash Native Audio.
- **Dynamic Content**: All sections (Experience, Skills, Projects) are driven by the `constants.ts` data file.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views using Tailwind CSS.
- **Smooth Navigation**: Custom scroll margins to ensure consistent header positioning.

---

## 📞 Contact
- **Email**: adiljv@gmail.com
- **Phone**: +92-3327302240
- **LinkedIn**: [javalover](https://www.linkedin.com/in/javalover/)
