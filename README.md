# 🌿 AgriTrust AI-Ledger

**AgriTrust AI-Ledger** is a state-of-the-art, decentralized supply chain solution for the agricultural industry. By combining the power of the **MERN stack**, **Ethereum Blockchain**, and **AI-driven trust analytics**, AgriTrust ensures food safety, transparency, and immutable provenance from farm to fork.

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Stack](https://img.shields.io/badge/stack-MERN--Blockchain-emerald)

## ✨ Core Features

-   **🛡️ Blockchain Provenance**: Every harvest batch is anchored on the Ethereum blockchain with a unique cryptographic hash.
-   **🤖 AI Trust Scoring**: A heuristic engine evaluates data consistency, sensor readings, and historical behavior to assign a "Trust Score."
-   **📱 QR-Driven Transparency**: Consumers can scan product QR codes to see a complete vertical timeline of the batch's journey.
-   **📡 Live IoT Monitoring**: Real-time telemetry simulation (Temperature, Humidity, Vibration) for batches in transit.
-   **🖼️ IPFS Integration**: Decentralized storage for quality certificates and harvest images.
-   **💠 Glassmorphic UI**: A premium, high-end dashboard designed with modern design principles.

## 🏗️ Project Architecture

```text
AgriTrust-AI-Ledger/
├── backend/            # Express API, MongoDB, AI Logic, IPFS
├── web_dashboard/      # React (Vite) Farmer, Admin & Distributor Portals
├── frontend/           # React Native (Expo) Mobile Consumer App
└── blockchain/         # Hardhat, Solidity Smart Contracts
```

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or Atlas)
- NPM or Yarn

### 2. Backend Setup
```bash
cd backend
npm install
# Configure your .env file
node server.js
```

### 3. Dashboard Setup
```bash
cd web_dashboard
npm install
npm run dev
```

### 4. Blockchain Setup
```bash
cd blockchain
npm install
npx hardhat compile
```

## 🔑 Test Credentials
Explore the system with these pre-seeded accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Farmer** | `farmer@agritrust.com` | `password123` |
| **Admin** | `admin@agritrust.com` | `password123` |
| **Distributor** | `bob@logistic.com` | `password123` |

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Framer Motion, Tailwind (Simulation via Vanilla CSS), Lucide Icons.
- **Backend**: Node.js, Express, Mongoose, JWT, Multer.
- **Blockchain**: Solidity, Ethers.js, Hardhat.
- **Mobile**: React Native, Expo.
- **Storage**: IPFS (Simulated Gateway).

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
*Built with ❤️ for a safer, more transparent agricultural world.*
