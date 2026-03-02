"""
Tarımcık Misinformation Reduction Service

Analyzes user-submitted content and compares it with verified agricultural sources
to assign a trust score and flag potentially misleading information.

In production, this would:
1. NLP analysis of content claims
2. Fact-checking against agricultural databases:
   - FAO (Food and Agriculture Organization) data
   - Turkish Ministry of Agriculture publications
   - Peer-reviewed agricultural journals
   - University extension services
3. Claim extraction and verification
4. Source credibility assessment
5. Trust score computation

Current implementation: Rule-based keyword analysis for demonstration.
"""

from typing import Dict, List, Any
import re


# Known misinformation patterns in agriculture
MISINFORMATION_PATTERNS = [
    {
        "keywords": ["mucize", "her derde deva", "kesin çözüm", "garantili"],
        "warning": "Abartılı iddialar tespit edildi. Tarımda 'mucize' çözümler genellikle yanıltıcıdır.",
        "penalty": 25,
    },
    {
        "keywords": ["kimyasal zararsız", "ilaç zararsız", "pestisit güvenli"],
        "warning": "Tarım kimyasallarının güvenliği hakkında yanıltıcı ifade. Her kimyasalın kullanım limitleri vardır.",
        "penalty": 20,
    },
    {
        "keywords": ["gdo sağlıklı", "gdo zararsız", "gdo doğal"],
        "warning": "GDO konusu tartışmalıdır. Bilimsel kaynaklara başvurun.",
        "penalty": 15,
    },
    {
        "keywords": ["suya gerek yok", "gübre gereksiz", "sulama şart değil"],
        "warning": "Temel tarım pratiklerinin gereksizliği iddia ediliyor. Bu bilimsel olarak doğru değildir.",
        "penalty": 30,
    },
    {
        "keywords": ["ay takvimi ekim", "astroloji tarım", "burç ekim"],
        "warning": "Bilimsel olmayan tarım pratikleri referans alınıyor.",
        "penalty": 20,
    },
]

# Trusted agricultural terms that increase reliability
TRUSTWORTHY_INDICATORS = [
    {
        "keywords": ["toprak analizi", "laboratuvar", "test sonucu"],
        "bonus": 10,
    },
    {
        "keywords": ["uzman", "ziraat mühendisi", "bakanlık", "üniversite"],
        "bonus": 8,
    },
    {
        "keywords": ["araştırma", "bilimsel", "çalışma", "veri"],
        "bonus": 7,
    },
    {
        "keywords": ["deney", "deneme", "gözlem", "sonuç"],
        "bonus": 5,
    },
    {
        "keywords": ["organik", "biyolojik mücadele", "entegre zararlı yönetimi"],
        "bonus": 5,
    },
]

# Verified agricultural sources
VERIFIED_SOURCES = [
    {
        "name": "T.C. Tarım ve Orman Bakanlığı",
        "url": "https://www.tarimorman.gov.tr",
        "topics": ["politika", "destek", "mevzuat", "üretim"],
    },
    {
        "name": "FAO - Gıda ve Tarım Örgütü",
        "url": "https://www.fao.org",
        "topics": ["küresel", "iklim", "gıda güvenliği", "sürdürülebilir"],
    },
    {
        "name": "TÜBİTAK Marmara Araştırma Merkezi",
        "url": "https://www.tubitak.gov.tr",
        "topics": ["araştırma", "teknoloji", "inovasyon", "bilimsel"],
    },
    {
        "name": "Ziraat Fakülteleri",
        "url": "https://www.ankara.edu.tr/ziraat",
        "topics": ["eğitim", "akademik", "araştırma", "hastalık", "zararlı"],
    },
    {
        "name": "Tarım Kredi Kooperatifleri",
        "url": "https://www.tarimkredi.org.tr",
        "topics": ["girdi", "gübre", "ilaç", "tohum", "fiyat"],
    },
]


async def check_content_trust(content: str) -> Dict[str, Any]:
    """
    Analyze content for potential misinformation and assign a trust score.

    In production, this would:
    1. Extract factual claims from content using NLP
    2. Verify each claim against agricultural knowledge base
    3. Cross-reference with verified sources
    4. Calculate weighted trust score
    5. Generate specific warnings for flagged claims

    Args:
        content: Text content to analyze

    Returns:
        Dictionary with trust score, level, sources, and warnings
    """
    content_lower = content.lower()
    score = 70  # Base score
    warnings: List[str] = []
    relevant_sources: List[Dict[str, Any]] = []

    # Check for misinformation patterns
    for pattern in MISINFORMATION_PATTERNS:
        if any(kw in content_lower for kw in pattern["keywords"]):
            score -= pattern["penalty"]
            warnings.append(pattern["warning"])

    # Check for trustworthy indicators
    for indicator in TRUSTWORTHY_INDICATORS:
        if any(kw in content_lower for kw in indicator["keywords"]):
            score += indicator["bonus"]

    # Content length factor (very short content is less reliable)
    word_count = len(content.split())
    if word_count < 10:
        score -= 10
        warnings.append("İçerik çok kısa. Detaylı açıklama güvenilirliği artırır.")
    elif word_count > 50:
        score += 5  # Longer, more detailed content

    # Check for source references
    url_pattern = r"https?://[^\s]+"
    urls = re.findall(url_pattern, content)
    if urls:
        score += 10
    else:
        if word_count > 30:
            warnings.append("İçerikte kaynak referansı bulunmuyor. Güvenilir kaynak eklenmesi önerilir.")

    # Find relevant verified sources
    content_words = set(content_lower.split())
    for source in VERIFIED_SOURCES:
        relevance = sum(
            1 for topic in source["topics"] if topic in content_lower
        )
        if relevance > 0:
            relevant_sources.append({
                "name": source["name"],
                "url": source["url"],
                "relevance": min(relevance / len(source["topics"]), 1.0),
            })

    # Ensure score is within bounds
    score = max(0, min(100, score))

    # Determine trust level
    if score >= 75:
        level = "trusted"
    elif score >= 45:
        level = "caution"
    else:
        level = "misleading"

    # Sort sources by relevance
    relevant_sources.sort(key=lambda x: x["relevance"], reverse=True)

    return {
        "score": score,
        "level": level,
        "sources": relevant_sources[:5],
        "warnings": warnings,
    }
