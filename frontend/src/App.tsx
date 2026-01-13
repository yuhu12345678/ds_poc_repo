import { type FormEvent, useState } from "react";
import { AppShell } from "./components/AppShell";
import { useHealthcheck } from "./hooks/useHealthcheck";
import { useLinearRegression } from "./hooks/useLinearRegression";

function parseNumberList(input: string): number[] {
  const parts = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    throw new Error("Provide at least one number.");
  }

  const values = parts.map((part) => Number(part));
  if (values.some((value) => Number.isNaN(value))) {
    throw new Error("All values must be numbers.");
  }

  return values;
}

export default function App() {
  const { data, isLoading, isError, refetch, error } = useHealthcheck();
  const regression = useLinearRegression();
  const [xInput, setXInput] = useState("1, 2, 3, 4, 5");
  const [yInput, setYInput] = useState("2, 4, 5, 4, 5");
  const [predictInput, setPredictInput] = useState("6");
  const [formError, setFormError] = useState<string | null>(null);

  function handleRegressionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    try {
      const xValues = parseNumberList(xInput);
      const yValues = parseNumberList(yInput);
      const predictValue = Number(predictInput);

      if (Number.isNaN(predictValue)) {
        throw new Error("Prediction target must be a number.");
      }

      if (xValues.length !== yValues.length) {
        throw new Error("x and y need the same number of points.");
      }

      if (xValues.length < 2) {
        throw new Error("Provide at least two data points.");
      }

      regression.mutate({ x: xValues, y: yValues, predict_for: predictValue });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Invalid input.");
    }
  }

  return (
    <AppShell
      title="test-poc dashboard"
      subtitle="FastAPI + Vite scaffold wired together."
    >
      <section className="card">
        <header>
          <h2>API Health</h2>
          <button onClick={() => refetch()} disabled={isLoading}>
            Refresh
          </button>
        </header>
        {isLoading && <p>Checking backend…</p>}
        {isError && <p className="error">Failed: {error?.message}</p>}
        {data && (
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{data.status}</dd>
            </div>
            <div>
              <dt>Environment</dt>
              <dd>{data.environment}</dd>
            </div>
            <div>
              <dt>Version</dt>
              <dd>{data.version}</dd>
            </div>
            <div>
              <dt>Timestamp</dt>
              <dd>{new Date(data.timestamp).toLocaleString()}</dd>
            </div>
          </dl>
        )}
      </section>

      <section className="card">
        <header>
          <div>
            <h2>Simple Linear Regression</h2>
            <p>Send training pairs to the API and predict a new value.</p>
          </div>
          <button onClick={() => regression.reset()} disabled={regression.isPending}>
            Reset
          </button>
        </header>

        <form className="form-grid" onSubmit={handleRegressionSubmit}>
          <label>
            <span>X values (comma separated)</span>
            <input
              type="text"
              value={xInput}
              onChange={(event) => setXInput(event.target.value)}
              placeholder="e.g. 1, 2, 3, 4"
              autoComplete="off"
            />
          </label>

          <label>
            <span>Y values (comma separated)</span>
            <input
              type="text"
              value={yInput}
              onChange={(event) => setYInput(event.target.value)}
              placeholder="e.g. 2, 4, 5, 7"
              autoComplete="off"
            />
          </label>

          <label>
            <span>Predict for X</span>
            <input
              type="number"
              value={predictInput}
              onChange={(event) => setPredictInput(event.target.value)}
              step="any"
            />
          </label>

          <div className="actions">
            <button type="submit" disabled={regression.isPending}>
              {regression.isPending ? "Calculating…" : "Run regression"}
            </button>
          </div>
        </form>

        {formError && <p className="error">{formError}</p>}
        {regression.isError && (
          <p className="error">
            {regression.error instanceof Error ? regression.error.message : "Failed to run regression."}
          </p>
        )}

        {regression.data && (
          <dl className="regression-result">
            <div>
              <dt>Slope (m)</dt>
              <dd>{regression.data.slope.toFixed(4)}</dd>
            </div>
            <div>
              <dt>Intercept (b)</dt>
              <dd>{regression.data.intercept.toFixed(4)}</dd>
            </div>
            <div>
              <dt>Predicted Y</dt>
              <dd>{regression.data.predicted.toFixed(4)}</dd>
            </div>
          </dl>
        )}
      </section>
    </AppShell>
  );
}
