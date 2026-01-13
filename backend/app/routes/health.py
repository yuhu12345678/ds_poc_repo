from fastapi import APIRouter

from ..schemas.health import HealthResponse
from ..services.health_service import get_health_snapshot

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    """Return service health + metadata."""
    return get_health_snapshot()
