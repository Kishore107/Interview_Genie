# Interview Genie 🤖

Interview Genie is an AI-powered real-time interview assistant that transcribes your voice and provides instant responses using Mistral AI and Anthropic's Claude. Perfect for interview preparation, coding practice, and improving your communication skills.

![Interview Genie Demo](./public/demo.gif)



## ✨ Features

- **Real-time Voice Transcription**: Instantly converts your speech to text
- **AI-Powered Responses**: Get immediate feedback using Mistral AI or Anthropic's Claude
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Secure**: Your API keys are stored locally and never transmitted to any server
- **Multiple AI Providers**: Choose between Mistral AI and Anthropic for responses

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **AI Integration**: Mistral AI & Anthropic Claude
- **Voice Recognition**: Web Speech API
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Kishore107/Interview-Buddy.git
cd interview-buddy
```

2. Install dependencies:
```bash
npm install
```

3. Create API keys:
- For Mistral AI: Visit [Mistral AI Platform](https://console.mistral.ai/api-keys/)
- For Anthropic: Visit [Anthropic Console](https://console.anthropic.com/account/keys)
- Store them safely as you'll need to enter them in the app

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 💡 Usage

1. When you first open the app, you'll be prompted to enter your API keys
2. Choose your preferred AI provider (Mistral AI or Anthropic)
3. The keys will be securely stored in your browser's local storage
4. Click the microphone icon to start voice recording (make sure to allow microphone permissions)
5. Speak clearly into your microphone
6. Your voice will be transcribed in real-time using the Web Speech API
7. The selected AI provider will process your input and provide relevant responses
8. Click the microphone icon again to stop recording
9. You can view your conversation history in the chat interface

## 🔑 Environment Variables

No environment variables are needed as the API keys are stored locally in the browser.

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Kishore107/Interview-Buddy/issues).

## 👨‍💻 Author

Kishore Kumar
- GitHub: [@Kishore107](https://github.com/Kishore107)
- LinkedIn: [Kishore Kumar](https://www.linkedin.com/in/kishore-kumar-89042b190/)

## 🙏 Acknowledgments

- Mistral AI and Anthropic for powering the responses
- The React and Vite communities for excellent tools
- All contributors and users of Interview Buddy