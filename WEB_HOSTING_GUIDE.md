# How to Host the Web Version for Cross-Platform Sharing

For the desktop app to properly share links with web/mobile users, you need to host the web version online. Here are the **easiest free options**:

---

## 🚀 Quick Deploy (5 minutes, FREE)

### Option 1: GitHub Pages (Recommended)

**Steps:**

1. **Create GitHub Repository**
   ```bash
   cd d:\Games\hixshares
   git init
   git add index.html logo.png config.js
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hixshares.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repo → Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/` (root)
   - Click Save

3. **Get Your URL**
   - Your app will be live at: `https://YOUR_USERNAME.github.io/hixshares/`
   - Wait 2-3 minutes for deployment

4. **Update Desktop App Config**
   - Edit `d:\Games\hixshares\config.js`
   - Change `WEB_APP_URL` to your GitHub Pages URL:
   ```javascript
   WEB_APP_URL: 'https://YOUR_USERNAME.github.io/hixshares/',
   ```

5. **Rebuild Desktop App**
   ```bash
   npm run package
   ```

**Done!** Desktop app users can now share links that work for web users!

---

### Option 2: Netlify (Easiest - Drag & Drop)

**Steps:**

1. **Sign up**: https://netlify.com (free, use GitHub login)

2. **Drag & Drop Deploy**
   - Create a folder with these files:
     - `index.html`
     - `logo.png`
     - `config.js`
   - Drag the folder to Netlify dashboard
   - Get instant URL: `https://random-name-123.netlify.app`

3. **Optional: Custom Domain**
   - Click "Domain settings"
   - Change to: `hixshares.netlify.app`

4. **Update config.js**
   ```javascript
   WEB_APP_URL: 'https://hixshares.netlify.app/',
   ```

5. **Rebuild desktop app**
   ```bash
   npm run package
   ```

---

### Option 3: Vercel (Fast & Free)

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd d:\Games\hixshares
   vercel --prod
   ```

3. **Follow prompts**
   - Login with GitHub
   - Deploy to production
   - Get URL: `https://hixshares.vercel.app`

4. **Update config.js** and rebuild

---

## 🔧 After Hosting

### Update Desktop App (One Time)

1. **Edit config.js**
   ```javascript
   WEB_APP_URL: 'https://YOUR_ACTUAL_URL.com/',
   ```

2. **Rebuild**
   ```bash
   npm run package
   ```

3. **Test**
   - Run the new app
   - Create share room
   - Share link should now show your web URL!

### How It Works

**Desktop App User (Sender):**
1. Clicks "Create Share Room" → Gets code ABC123
2. Shares link: `https://hixshares.netlify.app/?room=ABC123`
3. Or shares QR code (contains same link)

**Web/Mobile User (Receiver):**
1. Opens link in browser
2. Gets connected via same PeerJS room
3. Receives files directly!

**Both Use Same Protocol** - PeerJS doesn't care if it's app or web!

---

## 📱 Testing Cross-Platform

### Test 1: Desktop → Web
1. Desktop app: Create room, get code
2. Phone browser: Open your web URL, enter code
3. Desktop app: Send file
4. Phone: Receives file ✅

### Test 2: Web → Desktop
1. Phone browser: Open web URL, create room
2. Desktop app: Switch to Receive, enter code
3. Phone: Send file
4. Desktop: Receives file ✅

---

## 💡 Pro Tips

### Use a Custom Domain
Buy a domain (like `hixshares.com`) for ~$12/year:
- Makes links professional: `https://hixshares.com/?room=ABC123`
- All hosting services support custom domains

### Keep Web & App in Sync
- When you update `index.html`, update both:
  1. Desktop app (rebuild with `npm run package`)
  2. Web version (push to GitHub/Netlify/Vercel)

### Free SSL/HTTPS
All these services provide free HTTPS - required for WebRTC/PeerJS!

---

## 🎯 Quick Summary

**Without hosted web version:**
- Desktop ↔ Desktop: ✅ Works (both have app)
- Desktop ↔ Web: ❌ Broken (local file:// links)

**With hosted web version:**
- Desktop ↔ Desktop: ✅ Works
- Desktop ↔ Web: ✅ Works (proper https:// links)
- Desktop ↔ Mobile: ✅ Works (QR codes work!)

**Total time to set up**: ~5-10 minutes  
**Cost**: $0 (free hosting)  
**Result**: Fully cross-platform file sharing! 🎉
