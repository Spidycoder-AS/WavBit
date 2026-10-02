import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Radio,
  Mic,
  Volume2,
  Zap,
  WifiOff,
  ShieldCheck,
  Cpu,
  Lock,
  Server,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Globe,
  Activity,
  FileText,
  Smartphone,
  Check,
  X,
  Sparkles,
  Waves,
  ArrowRight,
  Sliders,
  Gauge,
  Lightbulb,
  Share2,
  Terminal,
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function SeoSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'technology' | 'usecases'>(
    'overview'
  );

  const faqs: FAQItem[] = [
    {
      category: 'Core Technology',
      question: 'What is Acoustic Data Transmission and how does WavBit work?',
      answer:
        'Acoustic Data Transmission (ADT) is a technology that encodes digital data into sound waves. WavBit utilizes the Web Audio API, WebAssembly (WASM), and the open-source GGWave audio protocol to modulate text data into high-frequency sound pulses (Frequency Shift Keying - FSK). The receiving device listens through its microphone and decodes the audio frequencies back into binary text instantly—without requiring Wi-Fi, Bluetooth, or cellular networks.',
    },
    {
      category: 'Security & Air-Gap',
      question: 'How secure is sending data through sound waves?',
      answer:
        'WavBit provides a 100% air-gapped transmission medium. Because no radio waves (RF), Bluetooth, or IP packets are transmitted over network infrastructure, data cannot be intercepted by remote network sniffers, man-in-the-middle (MITM) Wi-Fi attacks, or cellular towers. Sound waves attenuate naturally over distance and cannot penetrate dense soundproof barriers, making acoustic transfer ideal for zero-trust environments.',
    },
    {
      category: 'AI Compression',
      question: 'Why does WavBit use Gemini AI Semantic Compression?',
      answer:
        'Physical sound channels have lower bandwidth constraints compared to radio spectrums. To maximize throughput and speed up transmission, WavBit integrates Google Gemini AI to semantically compress natural language strings. For example, "Can we meet at the office conference room at 4:00 PM tomorrow?" is compressed into "MEET|OFFICE|4PM|TMRW". This reduces character length by up to 70% while retaining 100% of human intent, enabling transmission in under 1 second.',
    },
    {
      category: 'Frequencies & Range',
      question: 'What frequency range does WavBit use and can humans hear it?',
      answer:
        'WavBit supports both audible frequencies (1kHz - 4kHz) for maximum noise resilience and near-ultrasonic frequencies (16kHz - 20kHz). Near-ultrasonic signals operate beyond the typical upper range of adult human hearing, enabling silent background data transfers between nearby devices. Effective range is typically 1 to 5 meters depending on ambient room noise and speaker output volume.',
    },
    {
      category: 'Compatibility',
      question: 'Which devices and web browsers are compatible with WavBit?',
      answer:
        'WavBit runs directly inside modern web browsers (Chrome, Safari, Firefox, Edge, Brave) on iOS, Android, macOS, Windows, and Linux. No app installation or native plugin is needed. The only requirement is browser support for Web Audio API and microphone permissions (`getUserMedia`).',
    },
    {
      category: 'Comparison',
      question: 'How does WavBit compare to Bluetooth, NFC, and WebRTC?',
      answer:
        'Unlike Bluetooth, WavBit requires zero device pairing, PIN codes, or OS permissions delay. Unlike NFC, devices do not need to physically touch within 2 centimeters. Unlike WebRTC or WhatsApp, WavBit functions completely offline with zero server signaling or internet connectivity required.',
    },
  ];

  // Schema.org Structured Data JSON-LD for Search Console & Rich Snippets
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://wavbit.vercel.app/#webapp',
        name: 'WavBit - Acoustic Data Transmission Platform',
        url: 'https://wavbit.com',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any (Web Audio API compatible browser)',
        description:
          'WavBit is an air-gapped web application for transferring data over sound waves using Web Assembly GGWave audio protocol and AI semantic compression.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Acoustic Data Transmission over Sound',
          'Air-gapped offline peer-to-peer data sharing',
          'GGWave WebAssembly audio modem',
          'Gemini AI semantic text compression',
          'Near-ultrasonic silent frequency spectrum',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://wavbit.vercel.app/#faq',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'TechArticle',
        '@id': 'https://wavbit.vercel.app/#tech-article',
        headline: 'Comprehensive Guide to Acoustic Data Transmission and Near-Field Sound Transfer',
        description:
          'Learn how Frequency Shift Keying (FSK), Web Audio API, GGWave WASM, and LLM Semantic Compression enable ultra-fast, air-gapped sound wave messaging.',
        author: {
          '@type': 'Organization',
          name: 'WavBit Research Lab',
        },
      },
    ],
  };

  return (
    <section className="mt-16 pt-16 border-t border-white/10 w-full text-left space-y-16 text-gray-300">
      {/* JSON-LD Script for Google Search Engine Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Header Badge & Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <Sparkles size={14} className="animate-pulse text-blue-400" />
          <span>Acoustic Data Transmission & SEO Knowledge Index</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Sending Data Over Sound Waves: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            The Science of Air-Gapped Acoustic Communication
          </span>
        </h2>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
          Explore how <strong>WavBit</strong> leverages cutting-edge Web Audio API modems, Frequency
          Shift Keying (FSK), and <strong>Google Gemini AI Semantic Compression</strong> to achieve
          secure, offline, cross-platform proximity data transfer.
        </p>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {[
            { id: 'overview', label: 'Protocol Specs', icon: Activity },
            { id: 'comparison', label: 'WavBit vs Others', icon: Sliders },
            { id: 'technology', label: 'How It Works', icon: Cpu },
            { id: 'usecases', label: 'Use Cases', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Tab Content */}
      <div className="w-full">
        {/* TAB 1: OVERVIEW & TECHNICAL SPECS */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* 4 Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:border-blue-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Carrier Frequencies
                  </span>
                  <Waves size={20} className="text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">1 - 20 kHz</div>
                <div className="text-xs text-gray-400 mt-1">
                  Audible & Near-Ultrasonic spectrum support
                </div>
              </div>

              <div className="bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    Network Requirement
                  </span>
                  <WifiOff size={20} className="text-purple-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">0 kb/s Data</div>
                <div className="text-xs text-gray-400 mt-1">
                  100% Offline air-gapped transmission
                </div>
              </div>

              <div className="bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Protocol Engine
                  </span>
                  <Cpu size={20} className="text-cyan-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">GGWave WASM</div>
                <div className="text-xs text-gray-400 mt-1">
                  High-density FSK audio modulation engine
                </div>
              </div>

              <div className="bg-gradient-to-b from-white/10 to-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md hover:border-emerald-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    AI Tokenizer
                  </span>
                  <Sparkles size={20} className="text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">Gemini LLM</div>
                <div className="text-xs text-gray-400 mt-1">
                  Up to 70% semantic payload reduction
                </div>
              </div>
            </div>

            {/* Deep Article 1 */}
            <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-lg space-y-4">
              <div className="flex items-center space-x-3 text-blue-400 font-bold text-sm tracking-wider uppercase">
                <FileText size={18} />
                <span>Technical Overview & Deep Dive</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                What is Data Over Sound & Near-Field Sound Transfer (NFST)?
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                <strong>Acoustic Data Transmission</strong> (also known as Data-over-Sound or Audio
                Modem technology) is a method of converting digital data streams into sound waves
                that propagate through physical air space. Unlike radio frequency (RF)
                communications such as Wi-Fi, Bluetooth, 4G/5G, or NFC, acoustic transmission
                operates entirely within the mechanical audio frequency domain (typically between 20
                Hz and 20,000 Hz).
              </p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                By synthesizing multi-tone audio frequencies through standard device speakers,
                WavBit creates acoustic packets containing data payloads. Nearby receiver
                micro-sensors (microphones) capture the ambient sound waves, process them via
                continuous Fast Fourier Transform (FFT) frequency analysis, and reconstruct the
                original text payload instantaneously.
              </p>
            </div>
          </motion.div>
        )}

        {/* TAB 2: COMPARISON TABLE */}
        {activeTab === 'comparison' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <h3 className="text-2xl font-bold text-white">
                WavBit vs Traditional Proximity Technologies
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Compare Acoustic Transmission against Bluetooth Low Energy, NFC, and WebRTC
                protocols.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider font-bold text-gray-400">
                    <th className="py-4 px-6 text-white">Feature / Parameter</th>
                    <th className="py-4 px-6 text-blue-400 font-extrabold bg-blue-500/10">
                      WavBit (Acoustic)
                    </th>
                    <th className="py-4 px-6">Bluetooth (BLE)</th>
                    <th className="py-4 px-6">NFC (Near Field)</th>
                    <th className="py-4 px-6">WebRTC P2P</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-300">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">
                      Requires Internet / Cloud
                    </td>
                    <td className="py-4 px-6 bg-blue-500/5 text-emerald-400 font-bold flex items-center gap-1">
                      <Check size={16} /> No (100% Offline)
                    </td>
                    <td className="py-4 px-6 text-gray-300">No</td>
                    <td className="py-4 px-6 text-gray-300">No</td>
                    <td className="py-4 px-6 text-rose-400 font-medium">Yes (Signaling Server)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Device Pairing Required</td>
                    <td className="py-4 px-6 bg-blue-500/5 text-emerald-400 font-bold flex items-center gap-1">
                      <Check size={16} /> Zero Pairing
                    </td>
                    <td className="py-4 px-6 text-amber-400">Complex OS Pairing</td>
                    <td className="py-4 px-6 text-emerald-400">Zero Pairing</td>
                    <td className="py-4 px-6 text-amber-400">ICE Signaling Handshake</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Air-Gapped Security</td>
                    <td className="py-4 px-6 bg-blue-500/5 text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck size={16} /> 100% Air-Gapped
                    </td>
                    <td className="py-4 px-6 text-rose-400">RF Eavesdrop Vulnerable</td>
                    <td className="py-4 px-6 text-emerald-400">High Air-Gap</td>
                    <td className="py-4 px-6 text-rose-400">Exposed over IP</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">
                      Radio Frequency (RF) Emissions
                    </td>
                    <td className="py-4 px-6 bg-blue-500/5 text-emerald-400 font-bold flex items-center gap-1">
                      <Check size={16} /> Zero RF Radiation
                    </td>
                    <td className="py-4 px-6 text-gray-400">2.4GHz RF Active</td>
                    <td className="py-4 px-6 text-gray-400">13.56MHz RF Active</td>
                    <td className="py-4 px-6 text-gray-400">Cellular / Wi-Fi RF</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">AI Semantic Compression</td>
                    <td className="py-4 px-6 bg-blue-500/5 text-purple-400 font-bold flex items-center gap-1">
                      <Sparkles size={16} /> Gemini LLM Native
                    </td>
                    <td className="py-4 px-6 text-gray-500">None</td>
                    <td className="py-4 px-6 text-gray-500">None</td>
                    <td className="py-4 px-6 text-gray-500">None</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-white">Hardware Compatibility</td>
                    <td className="py-4 px-6 bg-blue-500/5 text-cyan-400 font-bold flex items-center gap-1">
                      <Smartphone size={16} /> Any Mic & Speaker
                    </td>
                    <td className="py-4 px-6 text-gray-300">BLE Chipset Required</td>
                    <td className="py-4 px-6 text-amber-400">NFC Antenna Required</td>
                    <td className="py-4 px-6 text-gray-300">WebRTC Browser API</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB 3: HOW IT WORKS (STEP-BY-STEP WORKFLOW) */}
        {activeTab === 'technology' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold text-white">
                How WavBit Transmits Data Through Sound
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                A step-by-step breakdown of payload encoding, frequency modulation, and audio
                demodulation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: '01',
                  title: 'Payload Tokenization',
                  desc: 'Gemini AI compresses input natural language into concise, high-density tokens to optimize physical acoustic bandwidth.',
                  icon: Sparkles,
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  step: '02',
                  title: 'FSK Audio Encoding',
                  desc: 'The GGWave WebAssembly engine translates compressed data tokens into discrete acoustic carrier frequencies.',
                  icon: Sliders,
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  step: '03',
                  title: 'Soundwave Broadcast',
                  desc: 'Device speakers emit sound wave pulses (audible or silent near-ultrasonic spectrum) through physical air space.',
                  icon: Volume2,
                  color: 'from-cyan-500 to-blue-500',
                },
                {
                  step: '04',
                  title: 'FFT Micro Demodulation',
                  desc: 'The receiving device mic captures sound waves, performs FFT analysis, decodes frequencies, and displays text in real-time.',
                  icon: Mic,
                  color: 'from-emerald-500 to-teal-500',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-xs font-extrabold px-3 py-1 rounded-full text-white bg-gradient-to-r ${item.color}`}
                        >
                          STEP {item.step}
                        </span>
                        <Icon
                          size={22}
                          className="text-gray-400 group-hover:text-white transition-colors"
                        />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 4: USE CASES & APPLICATIONS */}
        {activeTab === 'usecases' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-lg space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-blue-500/20 text-blue-400">
                <Lock size={24} />
              </div>
              <h4 className="text-lg font-bold text-white">
                Air-Gapped Vaults & Zero-Trust Security
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Transfer sensitive encryption keys, passcodes, multi-factor tokens (MFA), or
                hardware seed phrases between isolated, network-disconnected machines without
                introducing RF exposure or USB malware vectors.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-lg space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-purple-500/20 text-purple-400">
                <WifiOff size={24} />
              </div>
              <h4 className="text-lg font-bold text-white">
                Disaster Recovery & Offline Grid Messaging
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Send emergency telemetry or text broadcasts during power outages, underground
                tunnels, maritime vessels, or remote field sites where cellular towers and Wi-Fi
                networks are down or inaccessible.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-lg space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-cyan-500/20 text-cyan-400">
                <Smartphone size={24} />
              </div>
              <h4 className="text-lg font-bold text-white">
                Zero-Touch Kiosks & Proximity Pairing
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Instantly transmit store promotional codes, Wi-Fi credentials, or digital receipt
                links to customer mobile devices near physical point-of-sale (POS) terminals without
                requiring Bluetooth pairing.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-lg space-y-3">
              <div className="p-3 w-fit rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Cpu size={24} />
              </div>
              <h4 className="text-lg font-bold text-white">
                IoT Microcontrollers & Embedded Sensors
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Communicate with budget microcontrollers (like ESP32, Arduino, or Raspberry Pi)
                equipped only with low-cost piezo buzzers and microphones, reducing hardware cost
                and power consumption.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* SEO ARTICLE BLOCK: COMPREHENSIVE KNOWLEDGE BASE */}
      <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-6 sm:p-10 rounded-3xl backdrop-blur-xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Globe size={14} />
            <span>Search Console & Technical Knowledge Index</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            The Physics of Acoustic Communications & AI Compression
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            In-depth analysis of how sound frequency modulation, spectral acoustic propagation, and
            neural token compression revolutionize proximity data exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300 leading-relaxed">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal size={18} className="text-purple-400" />
              Frequency Shift Keying (FSK) & Audio Wave Modulation
            </h4>
            <p>
              Frequency Shift Keying (FSK) is a digital modulation scheme in which digital
              information is transmitted through discrete frequency changes of a carrier wave. In
              WavBit, binary bytes are translated into distinct audio frequencies emitted by the
              transmitter speaker.
            </p>
            <p>
              By utilizing multi-frequency FSK (M-FSK) protocols optimized by the GGWave WebAssembly
              library, multiple audio frequencies can be emitted concurrently, significantly
              increasing payload density per millisecond while maintaining high signal-to-noise
              ratio (SNR) resilience against background room echo.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-400" />
              AI Semantic Compression: Overcoming Acoustic Bandwidth Limits
            </h4>
            <p>
              Physical acoustic channels inherently operate at lower bitrates (typically 8 to 64
              bytes per second) to ensure transmission stability across variable smartphone speaker
              acoustics and room reverbs.
            </p>
            <p>
              To overcome this physical bottleneck, WavBit introduces{' '}
              <strong>Gemini AI LLM Semantic Compression</strong>. Instead of sending raw
              uncompressed text strings, the AI distills conversational intent into compact
              structured tokens. The receiving device decodes the acoustic payload and uses the AI
              to reconstruct full contextual sentences seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-purple-400">
            <HelpCircle size={14} />
            <span>Frequently Asked Questions</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Everything You Need to Know About WavBit
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">
            Answers to common questions regarding sound wave transmission, security, and browser
            capabilities.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm sm:text-base flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={20} className="text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* KEYWORD TAXONOMY TAG CLOUD (SEO SEARCH CONSOLE OPTIMIZATION) */}
      <div className="pt-8 border-t border-white/5 space-y-4">
        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 text-center">
          Trending Search Index Keywords & Technical Taxonomy
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {[
            'Acoustic Data Transmission',
            'Data Over Sound',
            'GGWave WASM',
            'Web Audio API Modem',
            'Air-Gapped Messaging',
            'Offline Sound Transfer',
            'Near-Field Sound Transfer (NFST)',
            'Frequency Shift Keying (FSK)',
            'Ultrasonic Data Beacon',
            'AI Semantic Compression',
            'Gemini LLM Tokenizer',
            'Zero RF Proximity Transfer',
            'Fast Fourier Transform FFT',
            'Sound Wave File Transfer',
            'Device Speaker Data Broadcast',
            'Microphone Audio Demodulator',
            'Zero-Trust Air-Gap Security',
            'Browser Audio Transmission',
          ].map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* SMALLER FOOTER */}
      <footer className="pt-8 pb-4 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-400">WavBit</span>
          <span>•</span>
          <span>Air-Gapped Acoustic Protocol</span>
        </div>
        <div className="flex items-center space-x-1.5 font-medium text-gray-4 tracking-wide">
          <span>Made with</span>
          <span className="text-rose-500 animate-pulse text-sm">❤️</span>
          <span>by</span>
          <a
            href="https://iftikhariscoding.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            spidycoder
          </a>
        </div>
      </footer>
    </section>
  );
}
