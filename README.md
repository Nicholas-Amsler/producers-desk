# 🎬 Mademoiselle's Assistant — Producer's Desk

A beautiful, AI-powered productivity assistant built with ❤️ for my wife, a brilliant executive producer. Designed to streamline her workflow, fetch insights, summarize docs & YouTube videos (coming soon!), and keep her one step ahead.

![React](https://img.shields.io/badge/Built%20With-React-blue?style=flat\&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Styled%20With-TailwindCSS-06B6D4?style=flat\&logo=tailwindcss)
![n8n](https://img.shields.io/badge/Automation-n8n-orange?style=flat\&logo=n8n)
![License](https://img.shields.io/github/license/Nicholas-Amsler/producers-desk?style=flat)

---

## 🚀 Features

* 🎤 **Voice Input**: Speak your commands naturally
* 🤖 **ChatGPT Integration**: Smart assistant logic powered via n8n + OpenAI
* 💡 **Auto-Greeting**: Contextual, time-based welcome message
* 🧠 **Memory Enabled**: Session-based recall of previous inputs
* 📰 **News Ticker**: Dynamic scroll of current entertainment headlines
* 📄 **Document Summarization** *(coming soon)*
* 📺 **YouTube Link Summarization** *(coming soon)*

---

## 🛠️ Tech Stack

* **Frontend**: React + Tailwind CSS
* **AI**: OpenAI API (via custom Flowise/N8n endpoint)
* **Automation**: n8n self-hosted on secure VPS
* **Deployment**: Vercel (recommended for production hosting)

---

## 📦 Local Setup

```bash
# 1. Clone the repo
$ git clone https://github.com/Nicholas-Amsler/producers-desk.git
$ cd producers-desk

# 2. Install dependencies
$ npm install

# 3. Create a `.env` file
REACT_APP_OPENAI_API_KEY=your-openai-key
REACT_APP_NEWSAPI_KEY=your-newsapi-key

# 4. Run the app
$ npm start
```

---

## 🌍 Deployment

This app is optimized for deployment on:

* **[Vercel](https://vercel.com)**
* **[Netlify](https://netlify.com)**

To build:

```bash
npm run build
```

To deploy manually:

```bash
npm install -g serve
serve -s build
```

---

## 📸 Screenshots

> 📷 Add some high-quality screenshots or even a screen-recording gif here to show the UI in action.

---

## ❤️ Credits

Built by **[Nicholas Amsler](https://github.com/Nicholas-Amsler)** under Amsler Labs as a personal gift and professional flex.

> "Built with love for my wife — to make her day smoother, smarter, and a little more magical."

---

## 📬 Contact

If you're looking for a React + AI automation wizard:

📧 **[amsleranalytics@gmail.com](mailto:amsleranalytics@gmail.com)**
🔗 [Amsler Labs](https://amslerlabs.com) *(coming soon)*
💼 Available for freelance AI workflow automation + product builds

---

## 📃 License
![License](https://img.shields.io/badge/license-Proprietary-blue?style=flat)

This project is released under a **custom proprietary license**.  
Please see [LICENSE](./LICENSE) for terms of use, distribution, and commercial restrictions.

> Contact **amsleranalytics@gmail.com** for licensing inquiries, collaborations, or commercial rights.

