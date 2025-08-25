GradAI - AI-Powered Resume Builder & Tools

GradAI is an AI-powered platform that helps students and professionals create stunning resumes effortlessly. It uses React for the frontend and integrates OpenAI API for AI-driven features.

Features

✅ AI-Powered Resume Builder
✅ Real-time Resume Preview
✅ Download Resume as PDF
✅ Save Resume to Database (Optional)
✅ Multiple Templates (Coming Soon)
✅ AI Suggestions for Resume Content (Future Scope)

Tech Stack

Frontend: React, Tailwind CSS

AI API: OpenAI GPT

Optional Backend: Node.js + Express (For secure API usage & database storage)

Getting Started
1. Clone the Repository
cd GradAI

2. Install Dependencies
npm install

3. Setup Environment Variables

Create a .env file in the root directory and add:

REACT_APP_OPENAI_API_KEY=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



.env file should be in .gitignore (already configured).

4. Run the Application
npm start


The app will start on http://localhost:3000.

API Key Safety

Do NOT push your API key to GitHub.

Always store it in .env and never commit that file.

For production, set environment variables on your hosting platform (e.g., Vercel, Netlify).

For full security, use a backend to handle API calls.

Optional Backend Setup

If you want to secure the API key and enable database storage:

Create a Node.js/Express backend.

API calls to OpenAI should go through your backend.

This ensures keys are never exposed in the frontend.

Project Structure
GradAI/
├── src/
│   ├── pages/
│   │   ├── ResumeBuilder.jsx
│   │   ├── Summarizer.jsx (Coming Soon)
│   ├── App.js
│   ├── index.js
├── .env
├── .gitignore
├── README.md
├── package.json

Future Features

4-5 Professional Resume Templates

AI Content Suggestions

LinkedIn Profile Import

Multi-format Export (PDF, DOCX)

Cloud Storage & Sharing

AI Cover Letter Generator
