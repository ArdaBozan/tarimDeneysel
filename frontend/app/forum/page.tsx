"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Eye,
  Pin,
  CheckCircle,
  Plus,
  ChevronRight,
  Sprout,
  Bug,
  Droplets,
  Sun,
  Tractor,
  HelpCircle,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  topicCount: number;
  postCount: number;
}

interface Topic {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  replies: number;
  views: number;
  isPinned: boolean;
  isSolved: boolean;
  tags: string[];
  createdAt: string;
  lastReplyAt: string;
}

const categories: Category[] = [
  {
    id: "diseases",
    name: "Bitki Hastalıkları",
    description: "Bitki hastalıkları, teşhis ve tedavi yöntemleri",
    icon: <Sprout className="w-6 h-6" />,
    topicCount: 156,
    postCount: 1243,
  },
  {
    id: "pests",
    name: "Zararlılar",
    description: "Böcek ve zararlı tanıma ve mücadele",
    icon: <Bug className="w-6 h-6" />,
    topicCount: 98,
    postCount: 752,
  },
  {
    id: "irrigation",
    name: "Sulama & Su Yönetimi",
    description: "Sulama teknikleri ve su kaynakları yönetimi",
    icon: <Droplets className="w-6 h-6" />,
    topicCount: 67,
    postCount: 423,
  },
  {
    id: "climate",
    name: "İklim & Mevsimler",
    description: "Hava durumu, iklim değişikliği ve mevsimsel tarım",
    icon: <Sun className="w-6 h-6" />,
    topicCount: 45,
    postCount: 312,
  },
  {
    id: "equipment",
    name: "Ekipman & Teknoloji",
    description: "Tarım makineleri, teknoloji ve inovasyon",
    icon: <Tractor className="w-6 h-6" />,
    topicCount: 83,
    postCount: 567,
  },
  {
    id: "general",
    name: "Genel Tartışma",
    description: "Genel tarım konuları ve serbest tartışma",
    icon: <HelpCircle className="w-6 h-6" />,
    topicCount: 234,
    postCount: 2156,
  },
];

const recentTopics: Topic[] = [
  {
    id: "1",
    title: "Sera domateslerinde beyaz sinek sorunu nasıl çözülür?",
    author: "Mehmet K.",
    categoryId: "pests",
    replies: 12,
    views: 245,
    isPinned: true,
    isSolved: true,
    tags: ["domates", "sera", "beyaz-sinek"],
    createdAt: "2 saat önce",
    lastReplyAt: "30 dk önce",
  },
  {
    id: "2",
    title: "Damla sulama sistemi kurulum rehberi",
    author: "Ayşe D.",
    categoryId: "irrigation",
    replies: 28,
    views: 1023,
    isPinned: true,
    isSolved: false,
    tags: ["damla-sulama", "kurulum", "rehber"],
    createdAt: "1 gün önce",
    lastReplyAt: "3 saat önce",
  },
  {
    id: "3",
    title: "Buğday ekim zamanı ve toprak hazırlığı tavsiyeleri",
    author: "Ali R.",
    categoryId: "general",
    replies: 8,
    views: 156,
    isPinned: false,
    isSolved: false,
    tags: ["buğday", "ekim", "toprak"],
    createdAt: "3 saat önce",
    lastReplyAt: "1 saat önce",
  },
  {
    id: "4",
    title: "Elma ağaçlarında karaleke hastalığı ile mücadele",
    author: "Zeynep T.",
    categoryId: "diseases",
    replies: 15,
    views: 342,
    isPinned: false,
    isSolved: true,
    tags: ["elma", "karaleke", "fungisit"],
    createdAt: "5 saat önce",
    lastReplyAt: "2 saat önce",
  },
  {
    id: "5",
    title: "Drone ile tarımsal ilaçlama deneyimleriniz",
    author: "Hasan B.",
    categoryId: "equipment",
    replies: 19,
    views: 567,
    isPinned: false,
    isSolved: false,
    tags: ["drone", "ilaçlama", "teknoloji"],
    createdAt: "1 gün önce",
    lastReplyAt: "4 saat önce",
  },
];

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTopics = selectedCategory
    ? recentTopics.filter((t) => t.categoryId === selectedCategory)
    : recentTopics;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forum</h1>
          <p className="text-muted-foreground mt-1">
            Tarım topluluğuyla tartışın, soru sorun ve deneyimlerinizi paylaşın.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium">
          <Plus className="w-4 h-4" />
          Yeni Konu
        </button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
            }
            className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
              selectedCategory === cat.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-primary flex-shrink-0">
              {cat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-card-foreground text-sm">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {cat.description}
              </p>
              <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground">
                <span>{cat.topicCount} konu</span>
                <span>{cat.postCount} mesaj</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Topics */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          {selectedCategory
            ? categories.find((c) => c.id === selectedCategory)?.name
            : "Son Konular"}
        </h2>

        <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
          {filteredTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/forum/${topic.id}`}
              className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {topic.isPinned && (
                    <Pin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                  )}
                  {topic.isSolved && (
                    <CheckCircle className="w-3.5 h-3.5 text-success flex-shrink-0" />
                  )}
                  <h3 className="font-medium text-card-foreground text-sm truncate">
                    {topic.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{topic.author}</span>
                  <span>·</span>
                  <span>{topic.createdAt}</span>
                  <span>·</span>
                  <div className="flex gap-2">
                    {topic.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="bg-muted px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground flex-shrink-0">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {topic.replies}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {topic.views}
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
