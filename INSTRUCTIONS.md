# Project Instructions

## Prerequisites

- Docker Desktop (or another OCI runtime compatible with VS Code Dev Containers)
- VS Code with the Dev Containers extension (or the `devcontainer` CLI)


## First-Time Setup

Open the project in VS Code and choose **Dev Containers: Reopen in Container** (or run the CLI commands below):

```bash
devcontainer up --workspace-folder .
devcontainer exec --workspace-folder . just dev
```

The devcontainer installs Node, `just`, and `uv` automatically and runs `just install` as part of its `postCreateCommand`. Rerun `just install` manually inside the container whenever dependencies change.


## Day-to-Day Commands

| Command        | Behavior |
| -------------- | -------- |
| `just backend` | Starts FastAPI via `uvicorn backend.app.main:app --reload`. |
| `just frontend`| Runs Vite dev server (port 5173). |
| `just dev`     | Runs backend + frontend concurrently in one shell. |
| `just lint`    | Ruff lint + Biome lint (frontend). |
| `just fmt`     | Ruff format + Biome fmt (frontend). |
| `just typecheck` | Mypy across backend package. |
| `just test`    | Pytest suite in `backend/tests`. |

> Tip: Use two terminals for backend/frontend during development if `just dev` process management conflicts with your shell.
When working inside the devcontainer you can keep one terminal tab attached to `devcontainer exec --workspace-folder . just backend` (or use VS Code’s built-in terminals, which already run inside the container).


## Notebooks & Scripts

- Store exploratory work in `notebooks/`. `ipykernel` is already part of the dev dependency set, so VS Code / Jupyter can attach to this project’s virtualenv without extra steps.
- Keep throwaway automation or data wrangling helpers in `scripts/`. Consider adding `just` targets if a script becomes part of your workflow.

## Environment Variables

Backend configuration lives in `.env` (generated from `.env.example`):

```
PROJECT_NAME=test-poc
ENVIRONMENT=local
API_BASE_URL=http://127.0.0.1:8000
```

Frontend env vars use the `VITE_` prefix (`.env.local` inside `frontend/`). Set `VITE_API_BASE_URL` when pointing to remote APIs.

## Deployment Considerations

- Build frontend with `npm run build` and serve the static files from your preferred CDN/origin.
- Package the backend as a container image; the `backend.app.main:app` entrypoint is production ready for Gunicorn/Uvicorn workers.
- Generate a `uv.lock` as part of CI to ensure deterministic Python deploys.

Keep `INSTRUCTIONS.md` updated to reflect your team's workflow, secrets management approach, and release process.
