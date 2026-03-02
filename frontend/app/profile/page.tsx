"use client";

import { User, Settings, Camera, MessageSquare, BookOpen, Award } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold">
            KU
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Kullanıcı Adı</h1>
            <p className="text-muted-foreground">@kullanici</p>
            <p className="text-sm text-muted-foreground mt-2">
              Tarım tutkunu, organik çiftçi. Akdeniz bölgesinde sera ve açık tarla üretimi yapıyorum.
            </p>
            <div className="flex gap-6 mt-4 text-sm">
              <div className="text-center">
                <p className="font-bold text-foreground">24</p>
                <p className="text-muted-foreground">Paylaşım</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground">156</p>
                <p className="text-muted-foreground">Takipçi</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-foreground">89</p>
                <p className="text-muted-foreground">Takip</p>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm hover:bg-muted transition-colors">
            <Settings className="w-4 h-4" />
            Düzenle
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Camera, label: "Analiz", value: "12" },
          { icon: MessageSquare, label: "Forum Cevap", value: "45" },
          { icon: BookOpen, label: "Blog Okuma", value: "78" },
          { icon: Award, label: "Güven Puanı", value: "92%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Son Aktiviteler</h2>
        <div className="space-y-4">
          {[
            { action: "Bitki analizi yaptı", detail: "Domates yaprak analizi", time: "2 saat önce" },
            { action: "Forum cevabı yazdı", detail: "Sera sulama konusu", time: "5 saat önce" },
            { action: "Paylaşım yaptı", detail: "Hasat fotoğrafları", time: "1 gün önce" },
            { action: "Blog okudu", detail: "Akıllı tarım 2026", time: "2 gün önce" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
