# Hixs Shares - Windows Desktop App

![Hixs Shares](logo.png)

Lightning-fast P2P file transfers across all platforms - now as a native Windows application!

## 🎉 Quick Start

### Run the App NOW

Your app is ready to use immediately:

```
📁 Location: dist\Hixs Shares-win32-x64\Hixs Shares.exe
```

Just double-click to launch! No installation required.

## ✨ Features

- ⚡ **Lightning-fast P2P transfers** - Direct peer-to-peer, no cloud storage
- 🌐 **Cross-platform** - Works between Windows app, web browsers, and mobile
- 🔒 **Secure** - Direct encrypted connections using WebRTC
- 📦 **No file size limits** - Transfer files of any size
- 🎯 **Easy sharing** - 6-character room codes or QR codes
- 🖥️ **Desktop integration** - System tray, notifications, progress indicators
- 🔗 **Deep linking** - Open rooms with `hixshares://room/ABC123` URLs

## 📋 System Requirements

- Windows 10 (version 1809+) or Windows 11
- ~200MB disk space
- Internet connection

## 🚀 Development

### Install Dependencies
```bash
npm install
```

### Run in Development Mode
```bash
npm start
```

### Package for Distribution
```bash
npm run package
```

### Build for Microsoft Store
```bash
npm run dist:store
```
*(Requires Windows SDK - see MICROSOFT_STORE_GUIDE.md)*

## 📦 Distribution Options

### 1. Portable (Ready Now!)
- Share the `dist\Hixs Shares-win32-x64\` folder
- Users run `Hixs Shares.exe`
- No installation required

### 2. Microsoft Store
- Professional distribution
- Automatic updates
- User trust and discovery
- See [MICROSOFT_STORE_GUIDE.md](MICROSOFT_STORE_GUIDE.md) for steps

## 🔧 Project Structure

```
hixshares/
├── main.js              # Electron main process
├── preload.js           # Secure API bridge
├── index.html           # App UI (enhanced web version)
├── package.json         # App configuration
├── logo.png             # App icon
└── dist/                # Built packages
    └── Hixs Shares-win32-x64/
        └── Hixs Shares.exe
```

## 🧪 Testing

The app has been tested with:
- ✅ File transfer between desktop apps
- ✅ File transfer from web to desktop
- ✅ File transfer from desktop to web
- ✅ System tray functionality
- ✅ Native notifications
- ✅ Deep linking support
- ✅ Progress indicators

## 🤝 Cross-Platform Compatibility

The desktop app uses the **same PeerJS protocol** as the web version, ensuring perfect compatibility:

- **Web ↔ Desktop**: Share files between browsers and the Windows app
- **Desktop ↔ Desktop**: Share files between Windows computers
- **Mobile ↔ Desktop**: QR code support for easy mobile connections

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run in development mode |
| `npm run dev` | Run with DevTools open |
| `npm run package` | Create portable Windows build |
| `npm run build` | Create Windows installer |
| `npm run dist:store` | Create Microsoft Store package |

## 🎯 Next Steps

1. **Test the app**: Run `Hixs Shares.exe` from the dist folder
2. **Share with friends**: Copy the entire `Hixs Shares-win32-x64` folder
3. **Publish to Store**: Follow [MICROSOFT_STORE_GUIDE.md](MICROSOFT_STORE_GUIDE.md)

## 📚 Documentation

- **Quick Start**: [MICROSOFT_STORE_GUIDE.md](MICROSOFT_STORE_GUIDE.md)
- **Full Walkthrough**: See artifacts in `.gemini/antigravity/brain/`

## 🔐 Privacy

- No data collection
- No analytics
- No servers (pure P2P)
- All transfers are direct between peers

## 📄 License

MIT License - Copyright © 2026 Geethudinoyt

## 🙏 Acknowledgments

- Built with [Electron](https://electronjs.org)
- P2P powered by [PeerJS](https://peerjs.com)
- Cross-platform file sharing for everyone!

---

**Enjoy lightning-fast file transfers! ⚡**
