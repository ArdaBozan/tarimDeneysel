from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID


# ============ Auth Schemas ============

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=2, max_length=100)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: UUID
    username: str
    email: str
    full_name: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


# ============ Post Schemas ============

class PostCreate(BaseModel):
    content: str = Field(..., min_length=1)
    tags: Optional[List[str]] = []


class PostResponse(BaseModel):
    id: UUID
    content: str
    images: List[str] = []
    trust_score: Optional[float] = None
    trust_level: Optional[str] = None
    created_at: datetime
    author: UserResponse
    likes_count: int = 0
    comments_count: int = 0

    class Config:
        from_attributes = True


class CommentCreate(BaseModel):
    content: str = Field(..., min_length=1)


class CommentResponse(BaseModel):
    id: UUID
    content: str
    created_at: datetime
    author: UserResponse

    class Config:
        from_attributes = True


# ============ Forum Schemas ============

class ForumCategoryResponse(BaseModel):
    id: UUID
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None
    topic_count: int = 0
    post_count: int = 0

    class Config:
        from_attributes = True


class TopicCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    content: str = Field(..., min_length=10)
    category_id: UUID
    tags: Optional[List[str]] = []


class TopicResponse(BaseModel):
    id: UUID
    title: str
    content: str
    views: int
    is_pinned: bool
    is_solved: bool
    created_at: datetime
    author: UserResponse
    reply_count: int = 0

    class Config:
        from_attributes = True


class ReplyCreate(BaseModel):
    content: str = Field(..., min_length=1)


class ReplyResponse(BaseModel):
    id: UUID
    content: str
    is_accepted: bool
    created_at: datetime
    author: UserResponse

    class Config:
        from_attributes = True


# ============ Blog Schemas ============

class BlogPostResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    cover_image: Optional[str] = None
    category: Optional[str] = None
    read_time: int
    views: int
    created_at: datetime
    author: UserResponse

    class Config:
        from_attributes = True


# ============ Chat Schemas ============

class ChatMessageRequest(BaseModel):
    session_id: Optional[str] = None
    message: str = Field(..., min_length=1)


class ChatMessageResponse(BaseModel):
    id: UUID
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class ChatSessionResponse(BaseModel):
    id: UUID
    title: Optional[str] = None
    created_at: datetime
    messages: List[ChatMessageResponse] = []

    class Config:
        from_attributes = True


# ============ Analysis Schemas ============

class PredictionResponse(BaseModel):
    label: str
    confidence: float
    type: str  # disease, pest, deficiency, healthy
    description: str


class AnalysisResponse(BaseModel):
    id: UUID
    image_url: str
    overall_health: str
    predictions: List[PredictionResponse]
    recommendations: List[str]
    analyzed_at: datetime

    class Config:
        from_attributes = True


# ============ Trust Schemas ============

class TrustCheckRequest(BaseModel):
    content: str = Field(..., min_length=10)


class VerifiedSourceResponse(BaseModel):
    name: str
    url: str
    relevance: float


class TrustCheckResponse(BaseModel):
    score: float
    level: str  # trusted, caution, misleading
    sources: List[VerifiedSourceResponse]
    warnings: List[str]


# ============ Search Schemas ============

class SearchRequest(BaseModel):
    q: str
    type: Optional[str] = "all"  # video, article, all


class SearchResultResponse(BaseModel):
    id: str
    type: str
    title: str
    description: str
    source: str
    url: str
    thumbnail: Optional[str] = None
    duration: Optional[str] = None
    date: str


# ============ Pagination ============

class PaginatedResponse(BaseModel):
    items: List
    total: int
    page: int
    page_size: int
    total_pages: int
