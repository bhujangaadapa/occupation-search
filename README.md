# DynaSim CareerAI 🚀

**Specialized Job Search & Skill-Match Application for Crash Safety, LS-DYNA, Georgia Tech OMSA Analytics, and Physics-AI Engineering Careers.**

Built with **Angular 22**, **Tailwind CSS**, **Firebase Firestore**, and pre-configured for **Vercel** deployment.

---

## 🌟 Overview & Strategic Moat

Traditional job boards cater to generic software engineers or generic data scientists. **DynaSim CareerAI** is built specifically around the unique high-demand intersection of:
1. **Crashworthiness & Passive Safety**: FMVSS 208/214/216, US-NCAP, Euro-NCAP, IIHS, ATD dummy kinematics (THOR, WorldSID, Hybrid III).
2. **LS-DYNA & Explicit Non-Linear Dynamics**: Impact simulations, contact algorithms, non-linear plasticity, material failure (*MAT_024, *MAT_054/058, *MAT_ADD_EROSION), SPH/ALE.
3. **Georgia Tech OMSA Analytics & Optimization**: Applied statistics, Operations Research, Mixed-Integer Programming, Multi-Disciplinary Design Optimization (MDO), Python, Pandas, SciPy, Gurobi.
4. **AI & Physics-Informed Machine Learning**: Physics-Informed Neural Networks (PINNs), Reduced-Order Surrogate Modeling (ROMs), Graph Neural Networks (GNNs) on CAE meshes, PyTorch, CAE workflow automation.

Candidates who possess both structural finite element mechanics and advanced data science/machine learning command an exceptional competitive moat in next-generation automotive OEMs (Tesla, Rivian, Lucid, Zoox, Waymo, Apple SPG) and CAE software leaders (Altair, Ansys).

---

## 🛠 Features

- **Dynamic Fit Score Engine**: Recalculates match percentages (0–100%) across all roles in real-time as you adjust your proficiency levels in the Skills Matrix.
- **Interactive Skills Matrix**: Adjust your proficiency levels (Beginner, Intermediate, Advanced, Expert) across LS-DYNA, Crash Safety, OMSA Analytics, AI/ML, and HPC tooling, or add custom skills.
- **Curated Role Library**: Real-world positions from Tesla, Rivian, Apple, Waymo, Zoox, Lucid, GM, Ford, Altair, Ansys, Boeing, Joby Aviation, and Boston Dynamics.
- **External Job Description Scanner**: Paste any job description from LinkedIn, Indeed, or OEM portals to instantly extract matching skills, compute fit score, and generate tailored resume bullets.
- **Interview & Resume Pitch Generator**: For every job, access specific bullet points and a strategic narrative explaining why your dual LS-DYNA + OMSA + AI skillset beats standard applicants.
- **Applications Pipeline Tracker**: Kanban workflow (Wishlist, Applied, Interviewing, Offer) with notes and salary tracking.
- **Firebase Firestore + Local Storage Fallback**: Seamless cloud persistence when Firebase is connected, with 100% offline LocalStorage fallback so the app works immediately out of the box.
- **Vercel Deployment Ready**: Pre-configured `vercel.json` with SPA routing and build output directory.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Run Development Server
```bash
npm start
```
Navigate to `http://localhost:4200/`. The app will automatically reload on source changes.

### 2. Build for Production
```bash
npm run build
```
Production build artifacts will be stored in `dist/occupation-search/browser`.

---

## ☁️ Deploying to Vercel

The repository includes `vercel.json` preconfigured for Angular SPAs:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/occupation-search/browser",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Option A: Using the Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option B: Using GitHub / GitLab / Bitbucket
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of DynaSim CareerAI Angular Firebase app"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Import the project in [Vercel Dashboard](https://vercel.com/new).
3. Vercel will automatically read `vercel.json` and deploy.

---

## 🔥 Firebase Setup

The app works in **Local Storage Mode** by default with zero configuration needed.

To sync applications and custom jobs to **Firebase Firestore**:
1. Create a Firebase project in [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** in test or production mode.
3. Click the **Firebase Pill / Settings** in the app's top navigation bar.
4. Paste your Web App credentials (`apiKey`, `projectId`, `authDomain`, etc.) and click **Save & Connect**.
