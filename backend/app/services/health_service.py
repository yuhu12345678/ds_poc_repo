from datetime import datetime, timezone

from ..core.config import settings
from ..schemas.health import HealthResponse


def get_health_snapshot() -> HealthResponse:
    """Return the canonical health payload consumed by the UI."""
    return HealthResponse(
        status="ok",
        environment=settings.environment,
        version=settings.version,
        timestamp=datetime.now(timezone.utc),
    )
