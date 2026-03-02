"""
Tarımcık AI Chatbot Service

Natural Language Processing module for answering agriculture-related questions.
Uses LLM (Large Language Model) with agriculture-specific knowledge.

In production, this would integrate with:
- OpenAI GPT / Azure OpenAI
- Google Gemini
- Local LLM (Ollama, vLLM)
- Hugging Face models fine-tuned on agricultural data

Current implementation: Rule-based demo with agricultural knowledge base.
"""

from typing import List, Tuple, Optional


# Agricultural knowledge base (simplified)
KNOWLEDGE_BASE = {
    "domates": {
        "hastalıklar": [
            "Erken Yanıklık (Alternaria solani): Yapraklarda halka şeklinde kahverengi lekeler",
            "Geç Yanıklık (Phytophthora infestans): Islak koyu lekeler, hızlı yayılma",
            "Fusarium Solgunluk: Tek taraflı sararma, damar kahverengileşmesi",
            "Yaprak Kıvırcıklık Virüsü: Yapraklarda kıvrılma ve küçülme",
        ],
        "bakım": [
            "Optimum sıcaklık: 21-27°C",
            "Sulama: Düzenli, kök bölgesine, yaprak ıslaklığından kaçının",
            "Gübreleme: N-P-K dengeli, meyve döneminde potasyum artırın",
            "Budama: Yan sürgünleri temizleyin, havalanmayı iyileştirin",
        ],
    },
    "buğday": {
        "hastalıklar": [
            "Pas Hastalığı: Yapraklarda turuncu-kahverengi pustüller",
            "Külleme: Beyaz unsu lekeler, yaprak yüzeyinde",
            "Septoria: Yaprak lekesi, verim kaybı",
        ],
        "bakım": [
            "Ekim zamanı: Ekim-Kasım ayları",
            "Toprak hazırlığı: Derin sürüm, gübre uygulaması",
            "Sulama: Kardeşlenme ve başaklanma dönemlerinde kritik",
        ],
    },
    "sulama": {
        "yöntemler": [
            "Damla Sulama: %30-60 su tasarrufu, kök bölgesine doğrudan",
            "Yağmurlama: Geniş alan, yaprak hastalığı riski",
            "Karık Sulama: Geleneksel, su kaybı yüksek",
            "Yeraltı Sulama: Buharlaşma kaybı düşük",
        ],
        "ipuçları": [
            "Sabah erken veya akşam üzeri sulayın",
            "Toprak nemini düzenli kontrol edin",
            "Bitki gelişim aşamasına göre su miktarını ayarlayın",
            "Malçlama ile buharlaşmayı azaltın",
        ],
    },
}


async def get_chatbot_response(
    message: str,
    history: List[Tuple[str, str]],
    user: Optional[object] = None,
) -> str:
    """
    Generate AI chatbot response for agriculture-related questions.

    In production, this would:
    1. Embed the user message
    2. Search agricultural knowledge base (RAG)
    3. Build prompt with context + user history
    4. Call LLM API
    5. Post-process and validate response

    Args:
        message: User's current message
        history: List of (role, content) tuples from conversation history
        user: Current user object for personalization

    Returns:
        AI assistant response string
    """
    message_lower = message.lower()

    # Check for plant-specific queries
    for plant, info in KNOWLEDGE_BASE.items():
        if plant in message_lower:
            if any(
                kw in message_lower
                for kw in ["hastalık", "sorun", "problem", "leke", "sarı", "kuruma"]
            ):
                diseases = "\n".join(f"• {d}" for d in info.get("hastalıklar", []))
                return (
                    f"**{plant.title()} Hastalıkları:**\n\n{diseases}\n\n"
                    f"Daha detaylı teşhis için **Bitki Analizi** sayfasından fotoğraf yükleyebilirsiniz. "
                    f"Fotoğraf analizi ile AI modelimiz hastalığı %80+ doğrulukla tespit edebilir.\n\n"
                    f"Başka sorunuz var mı?"
                )

            if any(
                kw in message_lower
                for kw in ["bakım", "nasıl", "yetiştir", "büyüt", "ekim"]
            ):
                care = "\n".join(f"• {c}" for c in info.get("bakım", []))
                return (
                    f"**{plant.title()} Bakım Bilgileri:**\n\n{care}\n\n"
                    f"Size özel bakım takvimi oluşturmak ister misiniz? "
                    f"Bölgenizi ve iklim koşullarınızı belirtirseniz daha detaylı öneriler sunabilirim."
                )

    # Irrigation queries
    if any(kw in message_lower for kw in ["sulama", "su", "irrigation"]):
        methods = "\n".join(
            f"• {m}" for m in KNOWLEDGE_BASE["sulama"]["yöntemler"]
        )
        tips = "\n".join(f"• {t}" for t in KNOWLEDGE_BASE["sulama"]["ipuçları"])
        return (
            f"**Sulama Yöntemleri:**\n\n{methods}\n\n"
            f"**Sulama İpuçları:**\n\n{tips}\n\n"
            f"Hangi bitkiyi yetiştirdiğinizi belirtirseniz, o bitkiye özel sulama programı önerebilirim."
        )

    # Fertilization queries
    if any(kw in message_lower for kw in ["gübre", "besin", "beslenme", "npk"]):
        return (
            "**Temel Bitki Besin Elementleri:**\n\n"
            "• **Azot (N):** Vejetatif büyüme, yaprak gelişimi. Eksikliğinde alt yapraklar sararır.\n"
            "• **Fosfor (P):** Kök gelişimi, çiçeklenme, meyve tutumu. Eksikliğinde morumsu renk.\n"
            "• **Potasyum (K):** Meyve kalitesi, hastalık direnci. Eksikliğinde yaprak kenarlarında yanma.\n\n"
            "**Mikro Elementler:** Demir, çinko, mangan, bor, bakır\n\n"
            "**Öneriler:**\n"
            "1. Mutlaka toprak analizi yaptırın\n"
            "2. Dengeli NPK gübresi kullanın\n"
            "3. Organik madde ile toprak yapısını iyileştirin\n"
            "4. Yaprak gübrelemesi hızlı sonuç verir\n\n"
            "Toprak analiz sonuçlarınızı paylaşırsanız size özel gübreleme programı oluşturabilirim."
        )

    # Pest queries
    if any(kw in message_lower for kw in ["zararlı", "böcek", "kurt", "sinek", "afit"]):
        return (
            "**Yaygın Tarımsal Zararlılar ve Mücadele:**\n\n"
            "• **Yaprak Bitleri (Afit):** Neem yağı, sarı yapışkan tuzak, uğur böceği salımı\n"
            "• **Beyaz Sinek:** Sarı yapışkan tuzak, encarsia formosa biyolojik mücadele\n"
            "• **Kırmızı Örümcek:** Nem artırma, kükürt uygulaması\n"
            "• **Yaprak Galeri Sineği:** Yapışkan tuzak, etkilenen yaprak temizliği\n"
            "• **Toprak Kurtları:** Toprak işleme, ışık tuzağı\n\n"
            "**Entegre Zararlı Yönetimi (IPM):**\n"
            "1. Düzenli gözlem ve izleme\n"
            "2. Önce biyolojik ve kültürel önlemler\n"
            "3. Kimyasal uygulama son çare olarak\n\n"
            "Hangi zararlıyla karşılaştığınızı fotoğrafla paylaşırsanız kesin teşhis yapabilirim."
        )

    # Default response
    return (
        "Sorunuzu anlamaya çalışıyorum. Tarımla ilgili şu konularda size yardımcı olabilirim:\n\n"
        "🌱 **Bitki bakımı:** Domates, biber, buğday, meyve ağaçları vb.\n"
        "🦠 **Hastalık teşhisi:** Fungal, bakteriyel, viral hastalıklar\n"
        "💧 **Sulama:** Damla sulama, yağmurlama, su yönetimi\n"
        "🧪 **Gübreleme:** NPK, organik gübre, yaprak gübresi\n"
        "🐛 **Zararlı kontrolü:** Böcek, akar, nematod mücadelesi\n"
        "🌤️ **İklim:** Mevsimsel planlama, don koruması\n\n"
        "Lütfen sorunuzu biraz daha detaylandırır mısınız? "
        "Hangi bitki, hangi bölge ve ne tür bir sorunla karşılaştığınızı belirtirseniz "
        "daha etkili yardımcı olabilirim.\n\n"
        "Ayrıca **Bitki Analizi** sayfasından fotoğraf yükleyerek "
        "AI destekli hastalık tespiti yaptırabilirsiniz."
    )
