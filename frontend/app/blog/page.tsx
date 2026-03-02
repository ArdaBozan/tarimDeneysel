import Link from "next/link";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: number;
  date: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "2026'da Türkiye'de Akıllı Tarım Uygulamaları",
    slug: "akilli-tarim-2026",
    excerpt:
      "IoT sensörleri, drone teknolojisi ve yapay zeka ile tarımda verimlilik artışı. Türkiye'deki akıllı tarım uygulamalarının güncel durumu.",
    category: "Teknoloji",
    author: "Dr. Ayşe Yılmaz",
    readTime: 8,
    date: "28 Şubat 2026",
    featured: true,
  },
  {
    id: "2",
    title: "Organik Tarımda Toprak Sağlığı Yönetimi",
    slug: "organik-toprak-sagligi",
    excerpt:
      "Organik tarımda toprak sağlığını koruma ve iyileştirme yöntemleri. Kompost, yeşil gübreleme ve münavebe sistemleri.",
    category: "Organik Tarım",
    author: "Prof. Mehmet Demir",
    readTime: 6,
    date: "25 Şubat 2026",
  },
  {
    id: "3",
    title: "İklim Değişikliğine Dayanıklı Bitki Çeşitleri",
    slug: "iklim-dayanikli-bitkiler",
    excerpt:
      "Kuraklığa, sıcağa ve tuzluluğa dayanıklı yeni bitki çeşitleri. Araştırma sonuçları ve saha denemeleri.",
    category: "Araştırma",
    author: "Dr. Zeynep Kara",
    readTime: 10,
    date: "22 Şubat 2026",
  },
  {
    id: "4",
    title: "Sera Domates Üretiminde Verimlilik Artırma Yöntemleri",
    slug: "sera-domates-verimlilik",
    excerpt:
      "Sera ortamında domates üretiminde verim artırmak için izlenecek adımlar: sıcaklık kontrolü, aşılama ve budama.",
    category: "Bitkisel Üretim",
    author: "Fatma Özcan",
    readTime: 7,
    date: "20 Şubat 2026",
  },
  {
    id: "5",
    title: "Tarımsal Destekler ve Hibe Programları 2026",
    slug: "tarimsal-destekler-2026",
    excerpt:
      "2026 yılında çiftçilere sunulan tarımsal destekler, hibe programları ve başvuru koşulları rehberi.",
    category: "Ekonomi",
    author: "Ali Yıldız",
    readTime: 5,
    date: "18 Şubat 2026",
  },
  {
    id: "6",
    title: "Biyolojik Mücadele: Faydalı Böcekler ile Zararlı Kontrolü",
    slug: "biyolojik-mucadele",
    excerpt:
      "Kimyasal ilaç kullanmadan zararlılarla mücadele. Uğur böceği, yeşil peygamber devesi ve diğer faydalı böcekler.",
    category: "Bitki Koruma",
    author: "Dr. Hasan Çelik",
    readTime: 9,
    date: "15 Şubat 2026",
  },
];

const categories = [
  "Tümü",
  "Teknoloji",
  "Organik Tarım",
  "Araştırma",
  "Bitkisel Üretim",
  "Ekonomi",
  "Bitki Koruma",
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Blog</h1>
        <p className="text-muted-foreground">
          Uzman yazarlardan güncel tarım bilgileri, rehberler ve araştırma sonuçları.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-primary hover:text-white transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {blogPosts
        .filter((p) => p.featured)
        .map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 mb-10 hover:shadow-xl transition-shadow group"
          >
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4">
              Öne Çıkan
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:underline">
              {post.title}
            </h2>
            <p className="text-green-100 leading-relaxed mb-4 max-w-3xl">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-green-200">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} dk okuma
              </span>
            </div>
          </Link>
        ))}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts
          .filter((p) => !p.featured)
          .map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/50 transition-all group"
            >
              <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium mb-3">
                {post.category}
              </span>
              <h3 className="text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.readTime} dk</span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
