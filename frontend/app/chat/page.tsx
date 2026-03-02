"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sprout, Trash2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Merhaba! 🌱 Ben Tarımcık AI Asistanı. Tarımla ilgili sorularınızı yanıtlamak için buradayım. Bitki bakımı, hastalık tespiti, gübreleme, sulama ve daha fazlası hakkında sorularınızı sorabilirsiniz. Size nasıl yardımcı olabilirim?",
  timestamp: new Date(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    if (lower.includes("domates") && (lower.includes("hastalık") || lower.includes("yaprak"))) {
      return `Domates bitkilerinde sık görülen hastalıklar:

**1. Erken Yanıklık (Alternaria solani)**
- Belirtiler: Alt yapraklarda kahverengi halka şeklinde lekeler
- Çözüm: Bakır bazlı fungisit, 7-10 gün arayla uygulama

**2. Geç Yanıklık (Phytophthora infestans)**
- Belirtiler: Yapraklarda koyu yeşil-kahverengi ıslak lekeler
- Çözüm: Metalaxyl bazlı ilaçlar, havalandırmayı iyileştirin

**3. Fusarium Solgunluk**
- Belirtiler: Tek taraflı yaprak sararması ve solma
- Çözüm: Dayanıklı çeşit kullanımı, toprak fumigasyonu

Daha detaylı bilgi almak veya fotoğraf ile analiz yaptırmak için **Bitki Analizi** sayfasını kullanabilirsiniz.`;
    }

    if (lower.includes("sulama") || lower.includes("su")) {
      return `Sulama ile ilgili temel bilgiler:

**Damla Sulama:** En verimli yöntem. Su tasarrufu %30-60. Kök bölgesine doğrudan uygulama.

**Yağmurlama:** Geniş alanlarda kullanışlı. Yaprak hastalıkları riskini artırabilir.

**Genel Kurallar:**
- Sabah erken veya akşam üzeri sulayın
- Toprak nemini düzenli kontrol edin
- Bitkinin gelişim aşamasına göre su miktarını ayarlayın
- Aşırı sulamadan kaçının, kök çürümesine yol açar

Hangi bitkiyi yetiştirdiğinizi söylerseniz, daha spesifik sulama önerileri verebilirim.`;
    }

    if (lower.includes("gübre") || lower.includes("besin")) {
      return `Temel bitki besin elementleri ve gübreleme:

**Makro Elementler:**
- **Azot (N):** Vejetatif büyüme, yaprak gelişimi
- **Fosfor (P):** Kök gelişimi, çiçeklenme
- **Potasyum (K):** Meyve kalitesi, hastalık direnci

**Gübreleme İpuçları:**
1. Toprak analizi yaptırın
2. Dengeli NPK gübresi kullanın
3. Organik madde ile toprak yapısını iyileştirin
4. Aşırı gübrelemeden kaçının
5. Yaprak gübrelemesi hızlı sonuç verir

Toprak analiz sonuçlarınızı paylaşırsanız, daha detaylı öneriler sunabilirim.`;
    }

    return `Sorunuz hakkında araştırma yapıyorum. Tarımla ilgili aşağıdaki konularda size yardımcı olabilirim:

- 🌱 Bitki bakımı ve yetiştirme teknikleri
- 🦠 Hastalık tespiti ve tedavi yöntemleri
- 💧 Sulama stratejileri
- 🧪 Gübreleme ve besin yönetimi
- 🐛 Zararlı kontrolü
- 🌤️ İklim ve mevsim planlaması

Lütfen sorunuzu biraz daha detaylandırır mısınız? Hangi bitki, hangi bölge ve ne tür bir sorunla karşılaştığınızı belirtirseniz daha etkili yardımcı olabilirim.`;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: String(Date.now()),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const aiResponse: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: simulateAIResponse(userMessage.content),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "assistant",
          content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Tarım Asistanı</h1>
            <p className="text-xs text-muted-foreground">Tarımla ilgili sorularınız için</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Temizle
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-card border border-border rounded-2xl p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "assistant"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot className="w-4 h-4" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "assistant"
                  ? "bg-muted text-card-foreground"
                  : "bg-primary text-white"
              }`}
            >
              <div className="text-sm whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </div>
              <p
                className={`text-xs mt-2 ${
                  msg.role === "assistant" ? "text-muted-foreground" : "text-green-100"
                }`}
              >
                {msg.timestamp.toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-muted rounded-2xl px-4 py-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tarımla ilgili sorunuzu yazın..."
          rows={2}
          className="flex-1 p-3 border border-border rounded-xl bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="px-5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
