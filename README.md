# CyberShield 🛡️

CyberShield is a modern, responsive, and interactive web application designed to educate the public about cyber security and promote safe online practices. Built as a Community Service Project, this platform provides interactive lessons, tools, quizzes, and resources to help students, senior citizens, and the general public stay safe in the digital world.

## 🌟 Features

*   **Interactive Learning Modules**: Comprehensive guides on Phishing, Malware, Ransomware, Social Engineering, and more.
*   **Password Strength Checker**: Real-time evaluation of password complexity to help users create unbreakable passwords.
*   **Scam Detector**: An analysis tool to identify potential phishing markers in suspicious emails, URLs, or SMS messages.
*   **Cyber Security Quiz**: A timed, 10-question interactive challenge that awards a "Certificate of Completion" upon passing (80%+ score).
*   **User Dashboard**: A personalized profile tracking quiz history and learning progress.
*   **AI Chatbot Assistant**: A floating interactive assistant to answer pressing cyber security questions on the fly.
*   **Multi-language Support**: Designed with accessibility in mind, featuring an English and Telugu (`te`) localization setup.
*   **Modern Aesthetics**: Built with a sleek dark mode, glassmorphism, and Framer Motion animations for a premium user experience.

## 🛠️ Tech Stack

*   **Frontend**: React + Vite + TypeScript
*   **Styling**: Tailwind CSS v3 (Custom Dark Theme)
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Routing**: React Router DOM
*   **Internationalization**: react-i18next
*   **Authentication & Database**: Firebase (Configured & Ready for API keys)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or download the project files.
2. **Navigate to the project directory**:
   ```bash
   cd cybershield
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```
4. **Configure Firebase**:
   Open `src/lib/firebase.ts` and replace the placeholder `firebaseConfig` object with your actual Firebase Project credentials.

### Running Locally

To start the development server, run:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 🌐 Deployment

This project is optimized for deployment on **Vercel**. 

1. Create a GitHub repository and push this codebase.
2. Log into [Vercel](https://vercel.com/) and click "Add New Project".
3. Import your GitHub repository. Vercel will automatically detect the Vite framework.
4. Click **Deploy**. Your site will be live in minutes!

## 🤝 Community Service Project Goals

CyberShield was built with the following community goals in mind:
*   **Awareness**: Elevating the baseline understanding of modern cyber threats.
*   **Resilience**: Providing actionable tools (like the Password Checker) to immediately improve user security posture.
*   **Accessibility**: Ensuring the platform is easy to use for all age groups, with multi-language support scaffolding for regional outreach.

## 📄 License
This project is open-source and intended for educational and community service purposes.
