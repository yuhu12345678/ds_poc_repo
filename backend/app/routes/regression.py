from fastapi import APIRouter, HTTPException

from ..schemas.regression import RegressionRequest, RegressionResponse
from ..services.regression_service import run_regression

router = APIRouter(prefix="/api", tags=["regression"])


@router.post("/linear-regression", response_model=RegressionResponse)
async def linear_regression(payload: RegressionRequest) -> RegressionResponse:
    """Fit a simple linear regression and predict a Y value."""
    try:
        return run_regression(payload)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
