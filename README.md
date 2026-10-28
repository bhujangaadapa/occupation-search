# DynaSim CareerAI 🚀

**Specialized Job Search & Skill-Match Application for Crash Safety, LS-DYNA, Georgia Tech OMSA Analytics, and Physics-AI Engineering Careers.**

Built with **Angular 22**, **Tailwind CSS**, and pre-configured for **instant zero-config Vercel deployment**.

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
- **Zero-Backend / Fast Browser Persistence**: Runs 100% in the browser using LocalStorage with instant load times, zero cost, and zero external backend setup.
- **Vercel Deployment Ready**: Pre-configured `vercel.json` with SPA routing and build output directory.

---

## 🚀 Getting Started

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

### Option A: Using GitHub / GitLab
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/occupation-search.git
   git push -u origin master
   ```
2. Import the project in [Vercel Dashboard](https://vercel.com/new).
3. Click **Deploy**. Vercel will automatically detect `vercel.json` and deploy it instantly.

### Option B: Using the Vercel CLI
```bash
npx vercel
```
