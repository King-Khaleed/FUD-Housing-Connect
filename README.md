# 🏠 FUD Housing Connect

A modern student housing rental platform connecting Federal University Dutse (FUD) students with verified property agents and landlords for seamless off-campus accommodation discovery.

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-teal?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Genkit](https://img.shields.io/badge/Google_Genkit-AI-orange?style=flat-square&logo=google-cloud)](https://firebase.google.com/docs/genkit)

## Overview

FUD Housing Connect is a web application designed to simplify the process of finding off-campus housing for students at the Federal University Dutse, Jigawa State, Nigeria. The platform addresses the common challenges students face, such as dependency on word-of-mouth, the difficulty of verifying agent credibility, and the time-consuming nature of physical property hunting.

Our goal is to provide a centralized, trustworthy, and user-friendly hub where students can browse, compare, and connect with property agents securely and efficiently.

## ✨ Features

The platform is packed with features designed for both students and property agents:

- ✅ **Advanced Property Search**: Filter listings by price, location, room type, amenities, and more.
- ✅ **Agent & Student User Modes**: Easily switch between student and agent views for a tailored experience.
- ✅ **Interactive Property Details**: View comprehensive property descriptions, image galleries, and key details.
- ✅ **Agent Dashboard**: A dedicated portal for agents to manage listings, view analytics, and track performance.
- ✅ **Property Management**: Agents can add, edit, and delete their property listings through a user-friendly form.
- ✅ **AI Housing Assistant**: A conversational AI that provides personalized housing recommendations based on user preferences.
- ✅ **Direct Agent Contact**: Integrated WhatsApp buttons for instant communication with property agents.
- ✅ **Favorites & Comparison**: Save preferred properties to a personal list and compare up to three properties side-by-side.
- ✅ **Agent Verification System**: Trust badges for verified agents to enhance student safety and confidence.
- ✅ **Responsive Design**: A seamless experience across mobile, tablet, and desktop devices.
- ✅ **Viewing History**: A "Recently Viewed" section to easily revisit previously seen properties.
- ✅ **Location Proximity**: Clear indicators of a property's distance from the FUD campus.
- ✅ **Local Currency Support**: All prices are displayed in Nigerian Naira (₦).

## 📸 Screenshots

*Note: Add actual screenshots here when available*

- Homepage with featured properties
- Property search and filtering interface
- Property details page
- Mobile responsive views
- Agent Dashboard
- AI Housing Assistant Chat

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable technology stack:

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components for a consistent and accessible design system.
- **State Management**: React Context API with `use-local-storage` for persistent state.
- **AI Integration**: Google's Genkit for the AI Housing Assistant flow.
- **Icons**: Lucide React for clean and consistent icons.
- **Development**: ESLint for code quality and consistency.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/[username]/fud-housing-connect.git
    cd fud-housing-connect
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:9002](http://localhost:9002) in your browser to view the application.

### Environment Variables
Create a `.env` file in the root directory for any future environment variables:
```
# Add any environment variables here when a backend is integrated
# e.g., GOOGLE_API_KEY=
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory (with route groups)
│   ├── (main)/             # Student-facing routes
│   └── agent/              # Agent portal routes
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui components
│   └── ...                 # Custom components (PropertyCard, Header, etc.)
├── contexts/               # React Context providers (AppContext)
├── hooks/                  # Custom React hooks (use-local-storage)
├── lib/                    # Utilities, types, and mock data
├── ai/                     # AI-related flows and configuration
│   └── flows/              # Genkit flows
└── ...
```

## 👨‍💻 Development

### Available Scripts
- `npm run dev` - Start the development server.
- `npm run build` - Build the application for production.
- `npm run start` - Start the production server.
- `npm run lint` - Run ESLint to check for code quality issues.
- `npm run genkit:dev` - Run the Genkit development server.

### Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 🇳🇬 Local Context

This platform is specifically designed with the following local context in mind:
- **Target University**: Federal University Dutse (FUD), Jigawa State, Nigeria.
- **Market**: Accommodates the unique property market dynamics around the Dutse township.
- **Currency**: All financial transactions and prices are in Nigerian Naira (₦).
- **Communication**: WhatsApp is the primary channel for agent communication, reflecting its widespread use in Nigeria.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- The open-source community for the amazing libraries and tools used.
- The students and agents of the Federal University Dutse community who inspired this project.
