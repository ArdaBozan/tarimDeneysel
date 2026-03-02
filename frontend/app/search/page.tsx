"use client";

import { useState } from "react";
import { Search as SearchIcon, Play, FileText, Filter, ExternalLink } from "lucide-react";

interface SearchResult {
  id: string;
  type: "video" | "article";
  title: string;
  description: string;
  source: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  date: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "video",
    title: "Domates Yetiştirme Rehberi - Baştan Sona",
    description: "Tohum ekiminden hasada kadar domates yetiştirme sürecinin tüm adımları. Sera ve açık tarla uygulamaları.",
    source: "Tarım TV",
    url: "#",
    duration: "15:32",
    date: "2 hafta önce",
  },
  {
    id: "2",
    type: "article",
    title: "Organik Tarımda Zararlı Yönetimi",
    description: "Kimyasal ilaç kullanmadan zararlılarla mücadele yöntemleri. Biyolojik kontrol ve doğal repellentler.",
    source: "Tarım Bakanlığı",
    url: "#",
    date: "1 ay önce",
  },
  {
    id: "3",
    type: "video",
    title: "Damla Sulama Sistemi Kurulumu",
    description: "Adım adım damla sulama sistemi nasıl kurulur? Malzeme seçimi ve pratik ipuçları.",
    source: "Çiftçi Akademi",
    url: "#",
    duration: "22:45",
    date: "3 gün önce",
  },
  {
    id: "4",
    type: "article",
    title: "2026 Yılı Tahıl Fiyat Tahminleri",
    description: "Küresel iklim değişikliği ve arz-talep dengesinin 2026 tahıl fiyatlarına etkisi analizi.",
    source: "Tarım Ekonomisi Dergisi",
    url: "#",
    date: "1 hafta önce",
  },
  {
    id: "5",
    type: "video",
    title: "Sera İklim Kontrolü ve Otomasyon",
    description: "Serada sıcaklık, nem ve havalandırma otomasyonu. IoT sensörleri ile akıllı sera yönetimi.",
    source: "Agri-Tech",
    url: "#",
    duration: "18:10",
    date: "5 gün önce",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "video" | "article">("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Simulate search
    const filtered = mockResults.filter((r) => {
      const matchesFilter = filter === "all" || r.type === filter;
      const matchesQuery =
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        true; // Show all for demo
      return matchesFilter && matchesQuery;
    });

    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Video & Bilgi Arama
        </h1>
        <p className="text-muted-foreground">
          Tarımla ilgili video, makale ve rehberleri arayın.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Domates hastalıkları, sulama teknikleri..."
              className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-lg"
            />
          </div>
          <button
            type="submit"
            className="px-6 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium"
          >
            Ara
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {(["all", "video", "article"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {f === "all" ? "Tümü" : f === "video" ? "Videolar" : "Makaleler"}
            </button>
          ))}
        </div>
      </form>

      {/* Results */}
      {searched && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            {results.length} sonuç bulundu
          </p>

          <div className="space-y-4">
            {results.map((result) => (
              <a
                key={result.id}
                href={result.url}
                className="flex gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-sm hover:border-primary/50 transition-all group"
              >
                {/* Thumbnail / Icon */}
                <div className="w-24 h-20 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  {result.type === "video" ? (
                    <div className="relative">
                      <Play className="w-8 h-8 text-primary" />
                      {result.duration && (
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded">
                          {result.duration}
                        </span>
                      )}
                    </div>
                  ) : (
                    <FileText className="w-8 h-8 text-primary" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {result.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {result.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">{result.source}</span>
                    <span>·</span>
                    <span>{result.date}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        result.type === "video"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {result.type === "video" ? "Video" : "Makale"}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {!searched && (
        <div className="text-center py-16">
          <SearchIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Aramaya başlayın
          </h3>
          <p className="text-muted-foreground text-sm">
            Tarımla ilgili video ve makaleleri aramak için yukarıdaki arama çubuğunu kullanın.
          </p>
        </div>
      )}
    </div>
  );
}
