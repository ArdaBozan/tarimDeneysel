from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.config import settings
from app.routers import auth, posts, forum, blog, chat, analyze, search, trust


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="Tarımcık - Yapay Zeka Destekli Tarım Bilgi Platformu API",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Static files for uploads
    uploads_path = settings.STORAGE_LOCAL_PATH
    if not os.path.exists(uploads_path):
        os.makedirs(uploads_path)
    app.mount("/uploads", StaticFiles(directory=uploads_path), name="uploads")

    # Include routers
    api_prefix = "/api/v1"
    app.include_router(auth.router, prefix=f"{api_prefix}/auth", tags=["Authentication"])
    app.include_router(posts.router, prefix=f"{api_prefix}/posts", tags=["Posts"])
    app.include_router(forum.router, prefix=f"{api_prefix}/forum", tags=["Forum"])
    app.include_router(blog.router, prefix=f"{api_prefix}/blog", tags=["Blog"])
    app.include_router(chat.router, prefix=f"{api_prefix}/chat", tags=["AI Chat"])
    app.include_router(analyze.router, prefix=f"{api_prefix}/analyze", tags=["Plant Analysis"])
    app.include_router(search.router, prefix=f"{api_prefix}/search", tags=["Search"])
    app.include_router(trust.router, prefix=f"{api_prefix}/trust", tags=["Trust Score"])

    @app.get("/", tags=["Root"])
    async def root():
        return {
            "name": settings.APP_NAME,
            "version": settings.APP_VERSION,
            "status": "running",
            "docs": "/docs",
        }

    @app.get("/health", tags=["Health"])
    async def health():
        return {"status": "healthy"}

    return app


app = create_app()
