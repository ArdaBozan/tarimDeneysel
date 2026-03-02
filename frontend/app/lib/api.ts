const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Bir hata oluştu" }));
      throw new Error(error.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: { username: string; email: string; password: string; fullName: string }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getProfile() {
    return this.request("/auth/me");
  }

  // Posts / Feed
  async getPosts(page = 1, pageSize = 20) {
    return this.request(`/posts?page=${page}&page_size=${pageSize}`);
  }

  async createPost(data: { content: string; tags?: string[] }) {
    return this.request("/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async likePost(postId: string) {
    return this.request(`/posts/${postId}/like`, { method: "POST" });
  }

  async commentOnPost(postId: string, content: string) {
    return this.request(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  }

  // Forum
  async getForumCategories() {
    return this.request("/forum/categories");
  }

  async getForumTopics(categoryId?: string, page = 1) {
    const params = new URLSearchParams({ page: String(page) });
    if (categoryId) params.set("category_id", categoryId);
    return this.request(`/forum/topics?${params}`);
  }

  async createForumTopic(data: { title: string; content: string; categoryId: string; tags?: string[] }) {
    return this.request("/forum/topics", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getForumTopic(topicId: string) {
    return this.request(`/forum/topics/${topicId}`);
  }

  async replyToTopic(topicId: string, content: string) {
    return this.request(`/forum/topics/${topicId}/replies`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  }

  // Blog
  async getBlogPosts(page = 1, category?: string) {
    const params = new URLSearchParams({ page: String(page) });
    if (category) params.set("category", category);
    return this.request(`/blog?${params}`);
  }

  async getBlogPost(slug: string) {
    return this.request(`/blog/${slug}`);
  }

  // Chat (AI Chatbot)
  async sendChatMessage(sessionId: string | null, message: string) {
    return this.request("/chat/message", {
      method: "POST",
      body: JSON.stringify({ session_id: sessionId, message }),
    });
  }

  async getChatSessions() {
    return this.request("/chat/sessions");
  }

  async getChatSession(sessionId: string) {
    return this.request(`/chat/sessions/${sessionId}`);
  }

  // Plant Analysis
  async analyzeImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const headers: HeadersInit = {};
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/analyze/image`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Analiz sırasında hata oluştu" }));
      throw new Error(error.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // Search
  async search(query: string, type?: "video" | "article" | "all") {
    const params = new URLSearchParams({ q: query });
    if (type) params.set("type", type);
    return this.request(`/search?${params}`);
  }

  // Trust / Misinformation Check
  async checkTrust(content: string) {
    return this.request("/trust/check", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
