# test-poc

This repo was bootstrapped by `ds-template init`. It ships with a FastAPI backend, a Vite + React frontend, opinionated tooling (`uv`, `just`, TypeScript), and simple health-check plumbing so you can focus on product work instead of wiring.

> Devcontainer support is enabled. Open this folder with VS Code Dev Containers (or the `devcontainer` CLI) to get Node, `just`, and `uv` preinstalled inside the container image.


## Getting Started

1. `code .` → “Dev Containers: Reopen in Container” (or `devcontainer up --workspace-folder .`) to build the environment under `.devcontainer/`.
2. `just dev` &mdash; runs both FastAPI and Vite once you’re inside the container (the `postCreateCommand` already ran `just install`; rerun it manually if needed).
3. `just backend` &mdash; runs `uvicorn` with live reload inside the container.
4. `just frontend` &mdash; launches Vite dev server on port 5173.


The backend exposes `/api/health` and `/api/status`. The frontend ships with a hook that pings the health endpoint and surfaces status in the default view.

## Project Layout

```
.
├── backend/          # FastAPI app (routes, services, schemas, config, tests)
├── frontend/         # Vite + React app with components/hooks/lib/styles/types
├── notebooks/        # sandbox for exploratory notebooks (ipykernel is preinstalled)
├── scripts/          # ad-hoc automation / data utilities
├── Justfile          # repeatable automation commands (install, backend, frontend, dev, lint, fmt, test)
├── pyproject.toml    # uv-compatible Python project definition
├── README.md         # this file
└── INSTRUCTIONS.md   # onboarding + workflow tips
```

## Tooling Notes

- **Python runtime:** `.venv` is created automatically; `uv` handles dependency resolution + locking. The devcontainer’s `postCreateCommand` runs `just install`, which creates `.venv` inside the container. Run `just lint` (Ruff + mypy) and `just test` (Pytest).
- **Frontend:** Vite + React + TypeScript with React Query for data fetching primitives. Biome handles formatting/linting (`npm run fmt` / `npm run lint`), and env vars follow the `VITE_` prefix convention.
- **Process management:** The `Justfile` assumes macOS/Linux (Bash). Adapt the commands or install `just` on Windows WSL if needed.
- **Notebooks:** `ipykernel` ships in the dev dependencies so VS Code / Jupyter can attach to the project kernel immediately.
- **Dev Container:** `.devcontainer/devcontainer.json` installs Node 20, `just`, `uv`, AWS + Git tooling, and forwards ports 8000/5173.


## Next Steps

- Update `INSTRUCTIONS.md` with domain-specific context.
- Replace the sample routes/services/tests with real implementations.
- Add CI (GitHub Actions) to run `just lint` and `just test`.

Happy building!
