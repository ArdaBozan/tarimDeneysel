"""
Tarımcık Plant Image Analysis Service

Computer Vision module for plant disease, pest, and nutrient deficiency detection.

In production, this would use:
- PyTorch / TensorFlow deep learning models
- Pre-trained models (ResNet, EfficientNet) fine-tuned on plant disease datasets
- PlantVillage dataset, PlantDoc dataset
- Transfer learning approach

Model Pipeline:
1. Image preprocessing (resize, normalize)
2. Feature extraction (CNN backbone)
3. Classification head (disease/pest/deficiency labels)
4. Confidence scoring
5. Recommendation generation

Current implementation: Mock analysis for demonstration.
"""

from typing import Dict, List, Any
import random


# Disease labels the model can predict
DISEASE_LABELS = {
    "tomato_early_blight": {
        "label": "Domates - Erken Yanıklık (Alternaria)",
        "type": "disease",
        "description": "Yapraklarda konsantrik halka şeklinde kahverengi lekeler. Alt yapraklardan başlayıp üst yapraklara yayılır.",
        "recommendations": [
            "Etkilenen yaprakları toplayıp imha edin",
            "Bakır bazlı fungisit uygulayın (7-10 gün aralıkla)",
            "Bitkilerin havalanmasını iyileştirin",
            "Damla sulama kullanın, yaprak ıslaklığından kaçının",
            "Münavebe yapın, en az 2 yıl aynı yere domates dikmeyin",
        ],
    },
    "tomato_late_blight": {
        "label": "Domates - Geç Yanıklık (Phytophthora)",
        "type": "disease",
        "description": "Yapraklarda koyu yeşil-kahverengi ıslak lekeler. Serin ve nemli havalarda hızla yayılır.",
        "recommendations": [
            "Metalaxyl veya mancozeb bazlı fungisit uygulayın",
            "Hastalıklı bitkileri tamamen söküp imha edin",
            "Sera havalandırmasını artırın",
            "Dayanıklı çeşitler tercih edin",
        ],
    },
    "nitrogen_deficiency": {
        "label": "Azot (N) Eksikliği",
        "type": "deficiency",
        "description": "Alt yapraklarda sararma ve solgunluk. Büyüme geriliği. Çimlerde açık yeşil renk.",
        "recommendations": [
            "Amonyum sülfat veya üre uygulayın",
            "Yaprak gübresi olarak %2 üre çözeltisi püskürtün",
            "Organik madde (kompost, çiftlik gübresi) ekleyin",
            "Toprak pH değerini kontrol edin (6.0-6.8 arası ideal)",
        ],
    },
    "aphid_infestation": {
        "label": "Yaprak Biti (Afit) İstilası",
        "type": "pest",
        "description": "Yaprak altlarında küçük yeşil/siyah böcekler. Yaprak kıvrılması ve yapışkan balözü salgısı.",
        "recommendations": [
            "Neem yağı çözeltisi (%1) püskürtün",
            "Sarı yapışkan tuzaklar yerleştirin",
            "Uğur böceği salımı yapın (biyolojik mücadele)",
            "Basınçlı su ile yapraklardan uzaklaştırın",
            "Aşırı azotlu gübrelemeden kaçının",
        ],
    },
    "healthy": {
        "label": "Sağlıklı Bitki",
        "type": "healthy",
        "description": "Bitkiniz sağlıklı görünüyor. Mevcut bakım uygulamalarına devam edin.",
        "recommendations": [
            "Düzenli sulama ve gübreleme programınıza devam edin",
            "Koruyucu olarak organik fungisit uygulayabilirsiniz",
            "Düzenli gözlem yaparak erken teşhis sağlayın",
        ],
    },
}


async def analyze_plant_image(image_bytes: bytes) -> Dict[str, Any]:
    """
    Analyze a plant image for diseases, pests, and nutrient deficiencies.

    In production, this would:
    1. Preprocess image (resize to 224x224, normalize with ImageNet stats)
    2. Run through CNN model (EfficientNet-B4 or ResNet-50)
    3. Get prediction probabilities
    4. Return top-k predictions with confidence scores

    Args:
        image_bytes: Raw image bytes

    Returns:
        Dictionary with predictions, overall health, and recommendations
    """
    # In production: Run actual ML inference
    # model = load_model(settings.AI_MODEL_PATH + "/plant_disease_model.pth")
    # img = preprocess(image_bytes)
    # predictions = model(img)

    # Demo: Generate realistic mock predictions
    # Choose a random scenario
    scenarios = [
        {
            "overall_health": "warning",
            "predictions": [
                {**DISEASE_LABELS["tomato_early_blight"], "confidence": round(random.uniform(0.78, 0.95), 2)},
                {**DISEASE_LABELS["nitrogen_deficiency"], "confidence": round(random.uniform(0.45, 0.68), 2)},
            ],
        },
        {
            "overall_health": "critical",
            "predictions": [
                {**DISEASE_LABELS["tomato_late_blight"], "confidence": round(random.uniform(0.85, 0.97), 2)},
            ],
        },
        {
            "overall_health": "warning",
            "predictions": [
                {**DISEASE_LABELS["aphid_infestation"], "confidence": round(random.uniform(0.70, 0.92), 2)},
                {**DISEASE_LABELS["nitrogen_deficiency"], "confidence": round(random.uniform(0.40, 0.60), 2)},
            ],
        },
        {
            "overall_health": "healthy",
            "predictions": [
                {**DISEASE_LABELS["healthy"], "confidence": round(random.uniform(0.88, 0.99), 2)},
            ],
        },
    ]

    scenario = random.choice(scenarios)

    # Build response
    predictions = []
    all_recommendations = []

    for pred in scenario["predictions"]:
        predictions.append({
            "label": pred["label"],
            "confidence": pred["confidence"],
            "type": pred["type"],
            "description": pred["description"],
        })
        all_recommendations.extend(pred["recommendations"])

    # Deduplicate recommendations
    unique_recommendations = list(dict.fromkeys(all_recommendations))

    return {
        "overall_health": scenario["overall_health"],
        "predictions": predictions,
        "recommendations": unique_recommendations[:6],  # Max 6 recommendations
    }
