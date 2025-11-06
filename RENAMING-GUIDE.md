# Project Folder Renaming Guide

## ✅ New Project Name: `flex-living-reviews-dashboard`

The project name has been updated from `task` to `flex-living-reviews-dashboard` for better clarity and professionalism.

---

## 🔄 Step-by-Step Renaming Process

### Step 1: Stop All Running Processes

**In your terminal/VS Code:**
- Press `Ctrl + C` to stop the dev server (if running)
- Close any terminal windows
- Save all open files
- Close VS Code

### Step 2: Rename the Folder

**Option A: Using File Explorer (Easiest)**
1. Navigate to `D:\`
2. Find the `task` folder
3. Right-click → Rename
4. Type: `flex-living-reviews-dashboard`
5. Press Enter

**Option B: Using PowerShell**
```powershell
# Navigate to parent directory
cd D:\

# Rename the folder
Rename-Item -Path "task" -NewName "flex-living-reviews-dashboard"
```

**Option C: Using Command Prompt**
```cmd
cd D:\
ren task flex-living-reviews-dashboard
```

### Step 3: Open the Renamed Folder

```powershell
# Navigate into the new folder
cd flex-living-reviews-dashboard

# Open in VS Code
code .
```

### Step 4: Verify Everything Works

```bash
# Install dependencies (if needed)
npm install

# Test the build
npm run build

# Start dev server
npm run dev
```

---

## ✅ Files Already Updated

The following file has been automatically updated:

- **`package.json`** - Project name changed to `flex-living-reviews-dashboard`

---

## 📝 For Git Repository

When you create a Git repository, use this name:

**Repository Name:** `flex-living-reviews-dashboard`

**Example Commands:**
```bash
# Initialize git
git init

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/flex-living-reviews-dashboard.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Flex Living Reviews Dashboard"

# Push to GitHub
git push -u origin main
```

---

## 🎯 Repository Description (for GitHub)

**Short Description:**
```
Reviews management dashboard for Flex Living properties with multi-channel review aggregation, analytics, and public display curation.
```

**Topics/Tags:**
```
nextjs, typescript, tailwind-css, reviews, dashboard, property-management, vacation-rentals, review-aggregation
```

---

## ✅ Verification Checklist

After renaming, verify:

- [ ] Folder renamed to `flex-living-reviews-dashboard`
- [ ] Can open folder in VS Code
- [ ] `npm install` works
- [ ] `npm run build` succeeds
- [ ] `npm run dev` starts server
- [ ] http://localhost:3000 loads correctly
- [ ] Dashboard works at /dashboard
- [ ] API endpoint works at /api/reviews/hostaway

---

## 📁 Final Project Structure

```
D:\
└── flex-living-reviews-dashboard\
    ├── app\
    ├── components\
    ├── data\
    ├── lib\
    ├── node_modules\
    ├── public\
    ├── package.json
    ├── README.md
    └── ... (other files)
```

---

## 🎉 Ready for Git!

After renaming, your project is ready to:
- Initialize as a Git repository
- Push to GitHub
- Share with others
- Deploy to Vercel/Netlify

---

**Status:** ✅ Project renamed and ready for version control!

