"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  Send,
  Shield,
  Tag,
} from "lucide-react";

interface MockPost {
  id: string;
  author: { name: string; username: string; avatar: string };
  content: string;
  images: string[];
  likes: number;
  comments: number;
  trustScore: number;
  tags: string[];
  createdAt: string;
  isLiked: boolean;
}

const mockPosts: MockPost[] = [
  {
    id: "1",
    author: { name: "Ahmet Yılmaz", username: "ahmet_ciftci", avatar: "AY" },
    content:
      "Bu yıl domates veriminde %30 artış sağladık. Damla sulama sistemine geçiş ve toprak analizine göre gübreleme büyük fark yarattı. Herkese tavsiye ederim!",
    images: [],
    likes: 42,
    comments: 8,
    trustScore: 85,
    tags: ["domates", "verimlilik", "sulama"],
    createdAt: "2 saat önce",
    isLiked: false,
  },
  {
    id: "2",
    author: { name: "Fatma Demir", username: "fatma_organik", avatar: "FD" },
    content:
      "Organik tarımda zararlı kontrolü için neem yağı kullanıyoruz. Kimyasal ilaçlara gerek kalmadan yaprak bitleriyle mücadele edebiliyoruz. Fotoğrafları paylaşıyorum.",
    images: ["/placeholder-plant.jpg"],
    likes: 67,
    comments: 15,
    trustScore: 92,
    tags: ["organik", "zararlı-kontrolü", "neem"],
    createdAt: "5 saat önce",
    isLiked: true,
  },
  {
    id: "3",
    author: { name: "Mehmet Kaya", username: "mehmet_sera", avatar: "MK" },
    content:
      "Sera domates bitkilerinde yaprak kıvrılması sorunu yaşıyorum. Sıcaklık, sulama ve besin dengesini kontrol ettim ama düzelmiyor. Önerisi olan var mı?",
    images: [],
    likes: 23,
    comments: 31,
    trustScore: 78,
    tags: ["sera", "domates", "hastalık"],
    createdAt: "1 gün önce",
    isLiked: false,
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<MockPost[]>(mockPosts);
  const [newPost, setNewPost] = useState("");

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: MockPost = {
      id: String(Date.now()),
      author: { name: "Siz", username: "kullanici", avatar: "KU" },
      content: newPost,
      images: [],
      likes: 0,
      comments: 0,
      trustScore: 0,
      tags: [],
      createdAt: "Az önce",
      isLiked: false,
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost("");
  };

  const getTrustColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 50) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">Akış</h1>

      {/* Create Post */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Tarım deneyimlerinizi paylaşın..."
          rows={3}
          className="w-full p-3 border border-border rounded-xl bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex items-center justify-between mt-3">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm">Fotoğraf</span>
          </button>
          <button
            onClick={handleCreatePost}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors text-sm font-medium"
          >
            <Send className="w-4 h-4" />
            Paylaş
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-5">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-card border border-border rounded-2xl p-5 hover:shadow-sm transition-shadow"
          >
            {/* Author */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {post.author.avatar}
                </div>
                <div>
                  <p className="font-semibold text-card-foreground text-sm">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    @{post.author.username} · {post.createdAt}
                  </p>
                </div>
              </div>

              {post.trustScore > 0 && (
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${getTrustColor(post.trustScore)}`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  {post.trustScore}%
                </div>
              )}
            </div>

            {/* Content */}
            <p className="text-card-foreground leading-relaxed mb-3">{post.content}</p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-border">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  post.isLiked
                    ? "text-red-500"
                    : "text-muted-foreground hover:text-red-500"
                }`}
              >
                <Heart className={`w-4.5 h-4.5 ${post.isLiked ? "fill-current" : ""}`} />
                {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-4.5 h-4.5" />
                {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="w-4.5 h-4.5" />
                Paylaş
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
