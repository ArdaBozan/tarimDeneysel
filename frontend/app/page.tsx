import Link from "next/link";
import {
  Sprout,
  Camera,
  MessageSquare,
  Shield,
  BookOpen,
  Users,
  ArrowRight,
  Leaf,
  Bug,
  Droplets,
} from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-accent text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sprout className="w-12 h-12" />
              <h1 className="text-4xl md:text-6xl font-bold">Tarımcık</h1>
            </div>
            <p className="text-xl md:text-2xl text-green-100 mb-4">
              Yapay Zeka Destekli Akıllı Tarım Platformu
            </p>
            <p className="text-lg text-green-200 mb-8 max-w-2xl mx-auto">
              Güvenilir tarım bilgisine ulaşın, bitkilerinizi analiz edin, 
              toplulukla deneyimlerinizi paylaşın ve yanlış bilginin önüne geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-foreground font-semibold rounded-xl hover:bg-yellow-400 transition-colors text-lg"
              >
                Hemen Başla
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur font-semibold rounded-xl hover:bg-white/20 transition-colors text-lg"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Platform Özellikleri
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tarımcık, çiftçilerin ve tarım meraklılarının ihtiyaç duyduğu tüm araçları tek platformda sunar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="AI Chatbot"
              description="Tarımla ilgili sorularınızı yapay zeka asistanımıza sorun. Kişiselleştirilmiş öneriler alın."
              href="/chat"
            />
            <FeatureCard
              icon={<Camera className="w-8 h-8" />}
              title="Bitki Analizi"
              description="Bitki fotoğraflarınızı yükleyin, hastalık, zararlı ve besin eksikliği tespiti yapın."
              href="/analyze"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Doğruluk Kontrolü"
              description="İçerikler doğrulanmış tarım kaynaklarıyla karşılaştırılır ve güven skoru atanır."
              href="/feed"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Topluluk Forumu"
              description="Deneyimlerinizi paylaşın, sorularınızı sorun ve uzmanlardan tavsiye alın."
              href="/forum"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Blog & Bilgi"
              description="Uzman yazarlardan güncel tarım bilgileri, rehberler ve araştırma sonuçları."
              href="/blog"
            />
            <FeatureCard
              icon={<Sprout className="w-8 h-8" />}
              title="İçerik Paylaşımı"
              description="Fotoğraf ve içeriklerinizi paylaşın, toplulukla etkileşim kurun."
              href="/feed"
            />
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Yapay Zeka Modülleri
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Üç güçlü AI modülü ile tarım sorunlarınıza çözüm bulun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AIModuleCard
              icon={<Leaf className="w-10 h-10 text-primary" />}
              title="Doğal Dil İşleme"
              items={[
                "Tarım sorularına anında cevap",
                "Büyük dil modeli tabanlı",
                "Kullanıcı geçmişine göre kişiselleştirme",
                "Tarıma özel bilgi kaynakları",
              ]}
            />
            <AIModuleCard
              icon={<Bug className="w-10 h-10 text-primary" />}
              title="Görüntü İşleme"
              items={[
                "Bitki hastalığı tespiti",
                "Zararlı tanıma",
                "Besin eksikliği analizi",
                "Derin öğrenme tabanlı",
              ]}
            />
            <AIModuleCard
              icon={<Droplets className="w-10 h-10 text-primary" />}
              title="Yanlış Bilgi Azaltma"
              items={[
                "İçerik doğrulama",
                "Güven skoru atama",
                "Kaynak karşılaştırma",
                "Yanıltıcı bilgi uyarısı",
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tarımda Dijital Dönüşüme Katılın
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Binlerce çiftçi ve tarım uzmanıyla birlikte güvenilir bilgiye ulaşın,
            veriye dayalı kararlar alın ve üretim verimliliğinizi artırın.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-foreground font-semibold rounded-xl hover:bg-yellow-400 transition-colors text-lg"
          >
            Ücretsiz Kaydol
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary transition-all duration-300"
    >
      <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Link>
  );
}

function AIModuleCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-8">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-card-foreground mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-muted-foreground">
            <span className="text-primary mt-1">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
