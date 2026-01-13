from ..schemas.regression import RegressionRequest, RegressionResponse


def _calculate_coefficients(x: list[float], y: list[float]) -> tuple[float, float]:
    """Compute slope and intercept for simple linear regression."""
    n = len(x)
    mean_x = sum(x) / n
    mean_y = sum(y) / n

    numerator = sum((xi - mean_x) * (yi - mean_y) for xi, yi in zip(x, y))
    denominator = sum((xi - mean_x) ** 2 for xi in x)

    if denominator == 0:
        raise ValueError("Cannot fit a line when all x values are identical.")

    slope = numerator / denominator
    intercept = mean_y - slope * mean_x
    return slope, intercept


def run_regression(request: RegressionRequest) -> RegressionResponse:
    """Fit a simple linear regression and return the prediction."""
    slope, intercept = _calculate_coefficients(request.x, request.y)
    predicted = slope * request.predict_for + intercept

    return RegressionResponse(slope=slope, intercept=intercept, predicted=predicted)
