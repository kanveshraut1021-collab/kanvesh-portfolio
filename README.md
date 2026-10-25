# Kanvesh Raut — Full-Stack Developer Portfolio

A personal developer portfolio for **Kanvesh Raut**, Computer Engineering Student at **G H Raisoni College of Engineering and Management, Pune**.

Built with a **React + Vite + Tailwind CSS** frontend featuring **GSAP ScrollTrigger** project animations and a **Python FastAPI + PostgreSQL + SQLAlchemy** backend.

---

## 🎨 Design Aesthetics & Color Palette
- **Warm Cream**: `#F5EEE7`
- **Secondary Cream**: `#EAE0D6`
- **Card Surface**: `#FAF6F1`
- **Warm Chocolate**: `#A67C64` & Deep Chocolate: `#705044`
- **Muted Crimson**: `#9B4B52` & Bold Crimson: `#882B34`
- **Dark Espresso**: `#221714` (Vision & Footer)
- **Typography**: Cormorant Garamond (editorial serif) + Plus Jakarta Sans + JetBrains Mono

---

## 🛠️ Technology Stack

### Frontend
- **React.js 19**
- **Vite 8**
- **Tailwind CSS 4**
- **GSAP 3 & ScrollTrigger**
- **Framer Motion**
- **Lucide React**

### Backend
- **Python 3.13**
- **FastAPI**
- **SQLAlchemy 2.0**
- **PostgreSQL** (with psycopg2-binary)
- **Pydantic v2 & Pydantic-Settings**
- **Uvicorn**

---

## 🚀 Projects Showcased
1. **FarmEdge** (`https://modernfarmingfarmedge.netlify.app/`) — Modern Farming & Agricultural Information Portal
2. **Sai Automobile** (`https://sai-automobile.vercel.app/`) — Commercial Workshop & Automobile Services
3. **Inventory Management System (StockHub)** (`https://inventory-management-system-iota-sandy.vercel.app/`) — Full-Stack Dark Inventory Dashboard

All projects feature real, live screenshots captured directly from production deployments and working **View Live Project** links.

---

## 📁 Project Architecture

```
KR/
├── backend/
│   ├── main.py              # FastAPI application, CORS, and API routing
│   ├── database.py          # SQLAlchemy engine, session maker, resilient DB connection
│   ├── models.py            # SQLAlchemy ContactMessage database model
│   ├── schemas.py           # Pydantic validation schemas
│   ├── config.py            # Environment settings
│   ├── requirements.txt     # Python backend dependencies
│   ├── .env                 # Database credentials & configuration
│   └── .env.example         # Environment template
│
├── frontend/
│   ├── public/
│   │   ├── profile/         # Kanvesh's verified developer portrait
│   │   └── screenshots/     # Real captured screenshots of FarmEdge, Sai, and StockHub
│   ├── src/
│   │   ├── components/
│   │   │   ├── BackgroundCanvas.jsx  # Floating particle constellation
│   │   │   ├── Header.jsx            # Glass navigation & reading progress bar
│   │   │   ├── Hero.jsx              # Student introduction & photo card
│   │   │   ├── About.jsx             # Bio, 3 core engineering pillars, chips
│   │   │   ├── Journey.jsx           # GHRCEM education & 6 milestones
│   │   │   ├── Skills.jsx            # Interactive toolkit & inspector
│   │   │   ├── ExploringTicker.jsx   # Currently exploring radar
│   │   │   ├── ProjectShowcase.jsx   # GSAP ScrollTrigger showcase stage
│   │   │   ├── Capabilities.jsx      # 7 practical strengths
│   │   │   ├── Goal.jsx              # Cinematic vision & career aspirations
│   │   │   ├── Contact.jsx           # Live form connected to FastAPI / PostgreSQL
│   │   │   └── Footer.jsx            # Monogram, social links, back to top
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚡ Running Locally

### 1. Backend (Python FastAPI)
```bash
# In KR directory
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
- API Docs: `http://127.0.0.1:8000/docs`
- Health: `http://127.0.0.1:8000/api/health`

### 2. Frontend (React + Vite)
```bash
cd frontend
npm run dev
```
- Opens at: `http://127.0.0.1:5173`

---

## 🗄️ PostgreSQL Database Configuration

Set your connection string in `backend/.env`:
```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<dbname>
```
*Note: If PostgreSQL is not active locally during development, the application gracefully falls back to local SQLite (`portfolio.db`) so development continues without downtime.*

---

## 📬 Contact & Verified Profiles
- **Email**: `kanveshraut9640@gmail.com`
- **Phone**: `+91 9075919023`
- **LinkedIn**: [Kanvesh Raut](https://www.linkedin.com/in/kanvesh-raut-2a5050407/)
- **GitHub**: [kanveshraut1021-collab](https://github.com/kanveshraut1021-collab)
