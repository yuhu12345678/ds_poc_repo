from pydantic import BaseModel, Field, model_validator


class RegressionRequest(BaseModel):
    x: list[float] = Field(..., min_length=2, description="Independent variable values.")
    y: list[float] = Field(..., min_length=2, description="Dependent variable values.")
    predict_for: float = Field(..., description="X value to predict a Y value for.")

    @model_validator(mode="after")
    def validate_lengths(self) -> "RegressionRequest":
        if len(self.x) != len(self.y):
            raise ValueError("x and y must contain the same number of points.")
        return self


class RegressionResponse(BaseModel):
    slope: float
    intercept: float
    predicted: float
