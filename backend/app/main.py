from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .routes import health, regression

app = FastAPI(title=settings.project_name, version=settings.version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(regression.router)


@app.get("/api/status", tags=["health"])
async def status() -> dict[str, str]:
    """Simple status route that's safe to hit from load balancers."""
    return {"status": "ok", "environment": settings.environment, "version": settings.version}
