# Reddit Reviewed (WIP)

**reddit-reviewed** is a multi-platform application that allows acts as your personal Reddit history navigator, showing you your saved post history with swipe interactions to save or remove it.

Review your saved post history with Reddit Reviewed!

## Features

🚀 **Explore Reddit History**: Navigate through your past comments and threads with ease.

🗑️ **Unsave Comments/Threads**: Clean up your saved section by unsaving items you no longer need.

👎 **Remove Upvotes**: Change your mind? Remove upvotes from posts or comments quickly.

💾 **Secure and Private**: Your Reddit history stays private, as all data is managed locally on your device.

### Build locally

Before you begin, ensure you have the following installed:

- Node.js (18+)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/reddit-reviewed.git
cd reddit-reviewed
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure your Reddit API credentials**

Create a `.env` file in the root directory and add your Reddit API keys:

```plaintext
VITE_REDDIT_CLIENT_ID=your_client_id
VITE_REDDIT_CALLBACK_URL=your_secret
```

4. **Run the application**

```bash
npm start
```

5. **Build your very own binary**

```bash
npm run make
```

### IFAQ

**Q**: This really sounds more useful as a mobile application.

**A**: True

### Tech Stack

- **Electron Forge**
- **React**
- **Tailwind**
- **Daisy UI**
- **Reddit API**
