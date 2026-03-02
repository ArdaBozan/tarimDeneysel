# Tarımcık - Yapay Zeka Destekli Akıllı Tarım Platformu 🌱

Tarımcık, yanlış tarım bilgisinin yayılmasını azaltmak ve güvenilir, doğru tarım bilgisine kolay erişim sağlamak amacıyla geliştirilmiş yapay zeka destekli bir platformdur.

## 🏗️ Sistem Mimarisi

```
Kullanıcı (Web / Mobil)
       ↓
Frontend (Next.js + TypeScript)
       ↓
Backend API (FastAPI - Python)
       ↓
Yapay Zeka Servisleri
       ↓
Veritabanı ve Medya Depolama
```

## 📁 Proje Yapısı

```
tarimDeneysel/
├── frontend/                 # Next.js + TypeScript Web Uygulaması
│   ├── app/
│   │   ├── components/       # Paylaşılan bileşenler
│   │   │   └── layout/       # Navbar, Footer
│   │   ├── lib/              # API client, types, utilities
│   │   ├── login/            # Giriş sayfası
│   │   ├── register/         # Kayıt sayfası
│   │   ├── feed/             # İçerik akışı (paylaşımlar)
│   │   ├── analyze/          # Bitki analizi (AI görüntü işleme)
│   │   ├── chat/             # AI Chatbot
│   │   ├── forum/            # Tartışma forumu
│   │   ├── search/           # Video ve bilgi arama
│   │   ├── blog/             # Blog ve bilgilendirici içerikler
│   │   └── profile/          # Kullanıcı profili
│   ├── public/
│   │   ├── manifest.json     # PWA manifest
│   │   └── sw.js             # Service Worker
│   └── Dockerfile
│
├── backend/                  # FastAPI Python Backend
│   ├── app/
│   │   ├── main.py           # FastAPI app entry point
│   │   ├── config.py         # Ayarlar
│   │   ├── database.py       # Database bağlantısı
│   │   ├── models.py         # SQLAlchemy modelleri
│   │   ├── schemas.py        # Pydantic şemaları
│   │   ├── routers/          # API endpoint'leri
│   │   │   ├── auth.py       # Kimlik doğrulama
│   │   │   ├── posts.py      # Paylaşımlar
│   │   │   ├── forum.py      # Forum
│   │   │   ├── blog.py       # Blog
│   │   │   ├── chat.py       # AI Chatbot
│   │   │   ├── analyze.py    # Bitki analizi
│   │   │   ├── search.py     # Arama
│   │   │   └── trust.py      # Güven skoru
│   │   └── services/         # İş mantığı servisleri
│   │       ├── chatbot.py    # NLP - Doğal Dil İşleme
│   │       ├── image_analysis.py  # Görüntü İşleme
│   │       └── misinformation.py  # Yanlış Bilgi Azaltma
│   ├── alembic/              # Veritabanı migration
│   ├── requirements.txt
│   └── Dockerfile
│
└── docker-compose.yml        # Konteyner orchestration
```

## 🧠 Yapay Zeka Modülleri

### 1. Doğal Dil İşleme (Chatbot)
- Kullanıcıların tarımla ilgili sorularını yanıtlar
- Büyük dil modellerine (LLM) dayalı
- Tarıma özel bilgi kaynaklarıyla beslenir
- Kullanıcı geçmişini dikkate alarak kişiselleştirilmiş öneriler sunar

### 2. Görüntü İşleme (Bitki Analizi)
- Bitki fotoğraflarını analiz eder
- Hastalık, zararlı ve besin eksikliği tespiti yapar
- Derin öğrenme tabanlı bilgisayarlı görü algoritmaları kullanır
- Tedavi ve bakım önerileri sunar

### 3. Yanlış Bilgi Azaltma
- Kullanıcı paylaşımlarını analiz eder
- İçerikleri doğrulanmış tarım kaynaklarıyla karşılaştırır
- İçeriklere güven skoru atar
- Eksik veya yanıltıcı bilgi durumunda kullanıcıları uyarır

## 🚀 Başlangıç

### Gereksinimler
- Node.js 18+
- Python 3.11+
- PostgreSQL 16
- Redis 7
- Docker & Docker Compose (opsiyonel)

### Docker ile Kurulum (Önerilen)

```bash
# Projeyi klonlayın
git clone https://github.com/kullanici/tarimDeneysel.git
cd tarimDeneysel

# Tüm servisleri başlatın
docker compose up -d

# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Manuel Kurulum

#### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux/Mac
pip install -r requirements.txt
cp .env.example .env         # Ayarları düzenleyin
uvicorn app.main:app --reload --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

## 📱 Mobil Uygulama

Platform PWA (Progressive Web App) desteği ile mobil uyumludur:
- PWA teknolojisi ile mobil tarayıcıda uygulama gibi çalışır
- WebView tabanlı olarak Google Play'de yayınlanabilir
- React Native ile tam native uygulamaya dönüştürülebilir

## 🔧 API Endpoints

| Endpoint | Yöntem | Açıklama |
|----------|--------|----------|
| `/api/v1/auth/register` | POST | Yeni kullanıcı kaydı |
| `/api/v1/auth/login` | POST | Kullanıcı girişi |
| `/api/v1/auth/me` | GET | Kullanıcı bilgileri |
| `/api/v1/posts` | GET/POST | Paylaşım listesi / oluşturma |
| `/api/v1/forum/categories` | GET | Forum kategorileri |
| `/api/v1/forum/topics` | GET/POST | Forum konuları |
| `/api/v1/blog` | GET | Blog yazıları |
| `/api/v1/chat/message` | POST | AI chatbot mesaj |
| `/api/v1/analyze/image` | POST | Bitki fotoğraf analizi |
| `/api/v1/search` | GET | Video ve makale arama |
| `/api/v1/trust/check` | POST | İçerik güvenilirlik kontrolü |

## 🗄️ Veritabanı Yapısı

- **users**: Kullanıcı bilgileri
- **posts**: İçerik paylaşımları
- **comments**: Yorumlar
- **forum_categories**: Forum kategorileri
- **forum_topics**: Forum konuları
- **forum_replies**: Forum yanıtları
- **blog_posts**: Blog yazıları
- **chat_sessions**: Sohbet oturumları
- **chat_messages**: Sohbet mesajları
- **plant_analyses**: Bitki analiz sonuçları
- **tags**: Etiketler

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.
