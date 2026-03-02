from fastapi import APIRouter, Query

router = APIRouter()


@router.get("/")
async def search(
    q: str = Query(..., min_length=1),
    type: str = Query("all"),  # video, article, all
):
    """Tarımla ilgili video ve makale arama."""
    # In production, this would query an external search API or internal index
    # For now, return mock results

    results = [
        {
            "id": "1",
            "type": "video",
            "title": "Domates Yetiştirme Rehberi",
            "description": "Tohum ekiminden hasada kadar domates yetiştirme süreci.",
            "source": "Tarım TV",
            "url": "https://example.com/video1",
            "duration": "15:32",
            "date": "2 hafta önce",
        },
        {
            "id": "2",
            "type": "article",
            "title": "Organik Tarımda Zararlı Yönetimi",
            "description": "Kimyasal ilaç kullanmadan zararlılarla mücadele yöntemleri.",
            "source": "Tarım Bakanlığı",
            "url": "https://example.com/article1",
            "date": "1 ay önce",
        },
        {
            "id": "3",
            "type": "video",
            "title": "Damla Sulama Sistemi Kurulumu",
            "description": "Adım adım damla sulama sistemi nasıl kurulur?",
            "source": "Çiftçi Akademi",
            "url": "https://example.com/video2",
            "duration": "22:45",
            "date": "3 gün önce",
        },
    ]

    if type != "all":
        results = [r for r in results if r["type"] == type]

    # Simple keyword filtering for demo
    if q:
        q_lower = q.lower()
        results = [
            r
            for r in results
            if q_lower in r["title"].lower() or q_lower in r["description"].lower()
        ] or results  # Fallback to all if no match

    return {"query": q, "type": type, "results": results, "total": len(results)}
