# PoseVault Setup Instructions

## 🚀 Quick Start

### 1. Push to GitHub

Navigate to this directory in your terminal and run:

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit with descriptive message
git commit -m "Initial commit: Modular component structure

- Refactored from 1500+ line monolith to 20 focused modules
- Added category notes feature
- Improved maintainability and testability
- Added proper separation of concerns"

# Add your remote (if not already added)
git remote add origin https://github.com/dockercapphotogeaphy/posevault.git

# Push to GitHub
git push -u origin main
```

If `main` branch doesn't exist yet, you might need:
```bash
git branch -M main
git push -u origin main
```

### 2. Install Dependencies (Optional - if you want to run locally)

```bash
npm install
```

### 3. Run Development Server (Optional)

```bash
npm run dev
```

## 📁 Project Structure

```
posevault/
├── src/
│   ├── App.jsx                      # Main application
│   ├── components/
│   │   ├── LoginScreen.jsx
│   │   ├── Header.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── CategoryGrid.jsx
│   │   ├── ImageCard.jsx
│   │   ├── ImageGrid.jsx
│   │   ├── SingleImageView.jsx
│   │   └── Modals/
│   │       ├── CategorySettingsModal.jsx
│   │       ├── NewCategoryModal.jsx
│   │       ├── ImageEditModal.jsx
│   │       ├── BulkEditModal.jsx
│   │       ├── TagFilterModal.jsx
│   │       ├── DeleteConfirmModal.jsx
│   │       └── CategorySettingsDropdown.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useCategories.js
│   └── utils/
│       ├── storage.js
│       └── helpers.js
├── README.md
├── package.json
├── .gitignore
└── SETUP.md (this file)
```

## 🎯 What's New

### Modular Architecture
- **20 focused files** instead of 1 monolith
- Each component has a single responsibility
- Easy to find, modify, and test

### New Features
- ✅ Category notes (like image notes)
- ✅ Better state management with custom hooks
- ✅ Cleaner separation of concerns

### Improved Maintainability
- Components are reusable
- Logic is separated from UI
- Easy to add new features

## 📝 Next Steps

After pushing to GitHub:

1. **Enable GitHub Pages** (optional)
   - Go to repo Settings > Pages
   - Select branch and /root folder
   - Your app will be live!

2. **Set up CI/CD** (optional)
   - GitHub Actions for automated testing
   - Automatic deployment

3. **Invite collaborators** (optional)
   - Share repo with team members
   - Set up branch protection rules

## 🐛 Troubleshooting

**Git push fails with "permission denied"**
- Make sure you're authenticated with GitHub
- Try: `gh auth login` (if using GitHub CLI)
- Or use Personal Access Token

**"main" branch doesn't exist**
- Run: `git branch -M main`
- Then: `git push -u origin main`

**Need help?**
- Check the README.md for detailed documentation
- Review individual component files for inline comments

---

**Made with ❤️ by Docker Cap Photography**
