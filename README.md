<div align="center">
  <h1>🎙️ WavBit</h1>
  <p><strong>Next-Generation Data Transmission via Audio Frequencies</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Status: Beta](https://img.shields.io/badge/Status-Beta-success.svg)]()
</div>

<br />

## 🌟 Overview

**WavBit** is an innovative, experimental web application designed to transfer data seamlessly between nearby devices using entirely acoustic channels—no internet, Bluetooth, or NFC required. By leveraging device speakers and microphones, WavBit broadcasts short encoded payloads through precise audio frequencies. 

This project explores the bleeding edge of offline, secure proximity communication utilizing the powerful [ggwave](https://github.com/ggerganov/ggwave) library and cutting-edge LLM semantic compression.

---

## 🚀 Key Features

* **Acoustic Data Transmission**: Securely broadcast and receive payloads using WebAssembly and the Web Audio API without traditional network connectivity.
* **AI-Powered Semantic Compression**: Integrates Gemini API to heavily compress natural language strings into optimized data tokens (e.g., `MEET|TOMORROW|19:00|CAFE`) to fit bandwidth constraints.
* **Real-time Acoustic Decoding**: Device microphones passively listen for specific frequency markers, actively decoding audio streams back into text instantaneously.
* **Cross-Platform Compatibility**: Fully functional on any modern browser supporting the Web Audio API across desktop and mobile devices.

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 19 / Vite
* **Styling:** Tailwind CSS / Motion (Framer Motion)
* **Audio Processing:** `ggwave` (WASM integration)
* **AI Integration:** Google GenAI SDK (Gemini)
* **Backend Runtime:** Node.js / Express

---

## ⚙️ Local Development Setup

To run WavBit locally, ensure you have **Node.js (v22+)** installed.

### 1. Clone the Repository
```bash
git clone https://github.com/Spidycoder-AS/WavBit.git
cd WavBit
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file from the example template and provide your Gemini API key:
```bash
cp .env.example .env
```
Add your key inside `.env`:
```env
GEMINI_API_KEY="your_api_key_here"
```

### 4. Start the Application
Boot up both the Express backend API and the Vite frontend simultaneously:
```bash
npm run dev
```

---

## 📡 Usage Guide

To successfully transmit data, you'll need **two devices** capable of playing and recording audio. 

> **Important:** Modern browsers require a secure context (`HTTPS` or `localhost`) for microphone access (`getUserMedia`). If testing over a local network, use a tunneling service (like [ngrok](https://ngrok.com/) or Cloudflare Tunnels) to provide an HTTPS endpoint for your secondary device.

1. **On Device A (Transmitter):** Navigate to **Send Data**, type your message (e.g., *"Hello from the acoustic network"*), and initiate transmission.
2. **On Device B (Receiver):** Navigate to **Receive Data**, grant microphone permissions, and tap **Start Listening**.
3. Bring the devices within audible range. Device A will emit a frequency sequence, and Device B will instantly decode and display the message.

---

## 💡 Best Practices for Reliable Transmission

* **Audio Clarity:** Ensure the transmitter's volume is appropriately loud.
* **Environment:** A quiet environment with minimal ambient acoustic interference yields the highest decoding accuracy.
* **Payload Size:** Due to the physical bandwidth limitations of acoustic transmission, keep payloads concise (ideally under 30 characters). AI Semantic compression is highly recommended to maximize efficiency.

---

## 📜 License

WavBit is open-source software licensed under the [MIT License](LICENSE). 

Designed and developed by [Spidycoder-AS](https://github.com/Spidycoder-AS).
