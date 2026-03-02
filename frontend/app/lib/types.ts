// Shared types for the Tarımcık platform

// ============ User Types ============
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  role: "user" | "expert" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

// ============ Post / Feed Types ============
export interface Post {
  id: string;
  author: User;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  trustScore?: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  author: User;
  postId: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface CreatePostRequest {
  content: string;
  images?: File[];
  tags?: string[];
}

// ============ Forum Types ============
export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  topicCount: number;
  postCount: number;
}

export interface ForumTopic {
  id: string;
  title: string;
  author: User;
  category: ForumCategory;
  content: string;
  replies: number;
  views: number;
  isPinned: boolean;
  isSolved: boolean;
  tags: string[];
  createdAt: string;
  lastReplyAt: string;
}

export interface ForumReply {
  id: string;
  topicId: string;
  author: User;
  content: string;
  likes: number;
  isAccepted: boolean;
  createdAt: string;
}

// ============ Blog Types ============
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: User;
  category: string;
  tags: string[];
  readTime: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// ============ Chat / AI Types ============
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// ============ Plant Analysis Types ============
export interface AnalysisResult {
  id: string;
  imageUrl: string;
  predictions: Prediction[];
  overallHealth: "healthy" | "warning" | "critical";
  recommendations: string[];
  analyzedAt: string;
}

export interface Prediction {
  label: string;
  confidence: number;
  type: "disease" | "pest" | "deficiency" | "healthy";
  description: string;
}

// ============ Misinformation Types ============
export interface TrustAnalysis {
  score: number; // 0-100
  level: "trusted" | "caution" | "misleading";
  sources: VerifiedSource[];
  warnings: string[];
}

export interface VerifiedSource {
  name: string;
  url: string;
  relevance: number;
}

// ============ API Response Types ============
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
