from datetime import datetime, timezone

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    environment: str
    version: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
