# Leo HealthTech Validator

## 🚀 Project Overview: Predicting Digital Health Startup Survival

Leo HealthTech Validator is an **AI-powered** tool designed to **assess the survival probability of digital health startup ideas**.

* **Problem:** High failure rate of digital health startups due to organizational complexity, non-adoption, and poor strategic alignment.
* **Solution:** Uses a two-stage strategic audit based on expert frameworks to stress-test viability across technical risk and market fit.

---

## 🧠 The AI Mechanics: The Interactive Interrogation

The core innovation of this project is the **Two-Stage Strategic Audit** system.

### 1. The Knowledge Base (RAG-Lite)

The AI's reasoning is grounded in specific, industry-relevant models:

* **Framework 1:** **NASSS Framework**, which **identifies and predicts risks related to non-adoption, abandonment, and difficulty scaling health technology**.
* **Framework 2:** **Play-to-Win Framework**, which **validates the project's overall strategy, focusing on "Where to Play" and "How to Win" in the market**.

### 2. The Interactive Interrogation Model

| Stage | Frontend Action | Backend Action (The AI's Reasoning) |
| :--- | :--- | :--- |
| **STAGE 1** | User submits the **initial pitch**. | The AI analyzes the pitch, injects the necessary **Frameworks**, and generates **3 specific, targeted questions** (The Interrogation) to address strategic gaps. |
| **STAGE 2** | User submits the **secondary input** (The Defense). | The AI receives all historical data. It performs the **final, complex calculation/assessment** using all inputs and frameworks to produce the final report. |

---

## 🖼️ Design & Aesthetics: Quiet Luxury & Classical Tech

The front-end is optimized for a premium user experience and visual impact.

* **Theme:** **Quiet Luxury** and **Dark/Muted Tones**.
* **Visuals:** Features **Asclepius (Greek God of Medicine)** prominently, often utilizing **3D Parallax effects** on mouse movement.
* **Fluidity:** The UI implements smooth scrolling, scroll-reveal animations, and a minimalist navigation structure designed for **a luxurious and professional user experience**.

---

## 🛠️ Technical Stack

This is a full-stack application built for performance and modern development practices.

* **AI Model:** Anthropic Claude **4 Sonnet** (via `@anthropic-ai/sdk`)
* **Framework:** **Next.js App Router**
* **Language:** **TypeScript**
* **Styling:** Tailwind CSS

---

## ⚙️ Setup and Installation

Follow these steps to run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/ohendarko/Leo.git
cd leoai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a file named .env.local in the root directory and add your Anthropic API key:
```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-your-private-key-here
```

### 4. Run the Application
```bash
npm run dev
```
The application will be accessible at http://localhost:3000 by default if not already being used.


## 🗺️ Project Structure

The project uses a clean, flat structure compliant with the latest Next.js App Router conventions:

```text
leoai/
├── app/                  # App Router Core
│   ├── api/              # Backend API Routes
│   │   └── assess/       # Contains /api/assess/route.ts
│   ├── audit/            # The primary functional page
│   ├── methodology/      # The secondary informational page
│   ├── page.tsx          # Landing Page (Marketing)
│   └── layout.tsx        # Navigation and structure
├── data/                 # Static Knowledge Base/Assets
│   └── frameworks.ts     # Framework definitions, etc.
└── package.json
```

🙋 Built By: 
[Kwadwo Ohene Darko](https://www.linkedin.com/in/dr-kwadwo-ohene-darko)

[Connect with me](https://www.linkedin.com/in/dr-kwadwo-ohene-darko)


This project was created for the Anthropic x UofT AI Hackathon.