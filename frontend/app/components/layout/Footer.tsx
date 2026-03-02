import Link from "next/link";
import { Sprout } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Sprout className="w-6 h-6" />
              <span>Tarımcık</span>
            </Link>
            <p className="text-sm text-green-200 leading-relaxed">
              Yapay zeka destekli tarım bilgi platformu. Güvenilir bilgi, topluluk desteği ve akıllı çözümler.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-3">Platform</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link href="/feed" className="hover:text-white transition-colors">Akış</Link></li>
              <li><Link href="/analyze" className="hover:text-white transition-colors">Bitki Analizi</Link></li>
              <li><Link href="/chat" className="hover:text-white transition-colors">AI Asistan</Link></li>
              <li><Link href="/forum" className="hover:text-white transition-colors">Forum</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">Kaynaklar</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Video Arama</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Hakkımızda</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Yasal</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-sm text-green-300">
          <p>&copy; {new Date().getFullYear()} Tarımcık. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
