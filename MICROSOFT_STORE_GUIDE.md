# Hixs Shares - Microsoft Store Quick Start Guide

## The App is Ready to Use RIGHT NOW! 🎉

Your Windows app has been successfully built and is located at:
**`d:\Games\hixshares\dist\Hixs Shares-win32-x64\Hixs Shares.exe`**

Just double-click to run! No installation needed.

---

## Publishing to Microsoft Store - 3 Simple Steps

### Step 1: Install Windows SDK (5 minutes)

Download and install: https://developer.microsoft.com/windows/downloads/windows-sdk/

During installation, select:
- ✅ Windows SDK Signing Tools for Desktop Apps
- ✅ Windows App Certification Kit

> **Having issues with the SDK?** Don't worry! See [STORE_PACKAGING_OPTIONS.md](STORE_PACKAGING_OPTIONS.md) for easier alternative methods including the free **MSIX Packaging Tool** from Microsoft Store.

### Step 2: Build Store Package (1 minute)

**Option A: Using npm (if SDK is working)**

Open PowerShell in `d:\Games\hixshares` and run:

```bash
npm run dist:store
```

This creates: `dist\Hixs Shares 1.0.0.appx`

**Option B: Using MSIX Packaging Tool (Recommended if SDK build fails)**

1. Download **MSIX Packaging Tool** from Microsoft Store (free)
2. Open the tool → Click "Application package"
3. Select: `d:\Games\hixshares\dist\Hixs Shares-win32-x64\Hixs Shares.exe`
4. Fill in package details and create package

See [STORE_PACKAGING_OPTIONS.md](STORE_PACKAGING_OPTIONS.md) for detailed instructions.


### Step 3: Submit to Microsoft Store

1. Create account: https://partner.microsoft.com/dashboard ($19 one-time fee)
2. Create new app submission
3. Upload the `.appx` file
4. Add app description and screenshots
5. Submit for review (24-48 hours)

**That's it!** Microsoft handles signing and distribution.

---

## Need Help?

See the full walkthrough for detailed instructions:
[walkthrough.md](file:///C:/Users/geethu/.gemini/antigravity/brain/e4a5ba53-5821-473b-b517-7048b468f135/walkthrough.md)

---

## Quick Test

1. Run `Hixs Shares.exe` from the dist folder
2. Click "Create Share Room"
3. Open a web browser and go to your web version
4. Enter the 6-character code
5. Send a file - it works across platforms! 🚀
