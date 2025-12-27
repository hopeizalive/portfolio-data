# Vercel Deployment Guide

This guide will help you deploy your portfolio project to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Method 1: Deploy via Vercel Dashboard (Recommended for First-Time Users)

### Step 1: Prepare Your Repository

1. Ensure your project is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Make sure your `package.json` has the build script:
   ```json
   {
     "scripts": {
       "build": "vite build"
     }
   }
   ```

### Step 2: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Vercel will auto-detect your Vite project settings

### Step 3: Configure Build Settings

Vercel should auto-detect these settings for Vite projects:
- **Framework Preset:** Vite
- **Build Command:** `npm run build` (or `vite build`)
- **Output Directory:** `dist`
- **Install Command:** `npm install`

If auto-detection doesn't work, manually set:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** `./` (or leave empty)

### Step 4: Configure Environment Variables

**IMPORTANT:** You must add your Gemini API key as an environment variable.

1. In the project settings, go to **"Environment Variables"**
2. Add the following variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key
   - **Environments:** Select all (Production, Preview, Development)

3. Click **"Save"**

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Your site will be live at a URL like: `https://your-project-name.vercel.app`

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project root directory:

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```

### Step 4: Set Environment Variables

Set the environment variable via CLI:

```bash
vercel env add GEMINI_API_KEY
```

When prompted:
- Enter your Gemini API key value
- Select environments: Production, Preview, Development

Or set it for a specific environment:

```bash
# Production only
vercel env add GEMINI_API_KEY production

# Preview only
vercel env add GEMINI_API_KEY preview
```

## Environment Variables

Your project requires the following environment variable:

| Variable Name | Description | Required |
|--------------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

**Note:** The API key is injected at build time via Vite's `define` option. After adding the environment variable, you'll need to redeploy for changes to take effect.

## Build Configuration

Vercel automatically detects Vite projects and uses these settings:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** Latest LTS (auto-detected)

If you need to customize, create a `vercel.json` file in your project root (see below).

## Optional: Custom Vercel Configuration

If you need custom settings, create a `vercel.json` file:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Note:** The `rewrites` rule ensures client-side routing works correctly for single-page applications.

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to **"Domains"**
3. Add your custom domain
4. Follow the DNS configuration instructions

### Environment Variable Updates

If you need to update environment variables:
1. Go to Project Settings → Environment Variables
2. Edit or add variables
3. **Redeploy** your project for changes to take effect

## Troubleshooting

### Build Fails with "GEMINI_API_KEY is not set"

**Solution:** 
- Ensure you've added `GEMINI_API_KEY` in Vercel's Environment Variables
- Make sure it's enabled for the environment you're deploying (Production/Preview)
- Redeploy after adding the variable

### API Key Not Working After Deployment

**Solution:**
- Verify the API key is correct in Vercel's environment variables
- Check that the variable name is exactly `GEMINI_API_KEY` (case-sensitive)
- Redeploy the project after updating the variable

### 404 Errors on Routes

**Solution:**
- Add the `rewrites` rule in `vercel.json` (see Optional Configuration above)
- This ensures all routes are handled by your React app

### Build Timeout

**Solution:**
- Check your build logs in Vercel dashboard
- Ensure `node_modules` is not accidentally committed
- Verify your `package.json` dependencies are correct

### Preview Deployments Not Working

**Solution:**
- Ensure environment variables are set for "Preview" environment
- Check that your Git repository is properly connected

## Continuous Deployment

Vercel automatically deploys:
- **Production:** Every push to your main/master branch
- **Preview:** Every push to other branches or pull requests

## Useful Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

## Support

If you encounter issues:
1. Check the build logs in Vercel dashboard
2. Review the [Vercel documentation](https://vercel.com/docs)
3. Check [Vercel's status page](https://www.vercel-status.com/)

---

**Note:** Remember to never commit your `.env` file or API keys to your repository. Always use Vercel's environment variables feature.

