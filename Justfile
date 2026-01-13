set shell := ["bash", "-c"]

@guard-venv:
	if [ ! -d ".venv" ]; then \
	echo ">> creating virtualenv (.venv)"; \
	python3 -m venv --upgrade-deps .venv >/dev/null 2>&1 || python3 -m venv .venv; \
	fi

@ensure-uv:
	just guard-venv
	if [ ! -x ".venv/bin/uv" ]; then \
	echo ">> installing uv in .venv"; \
	if [ ! -x ".venv/bin/pip" ]; then \
		echo ">> pip missing, bootstrapping via ensurepip"; \
		.venv/bin/python -m ensurepip --upgrade >/dev/null 2>&1 || true; \
	fi; \
	.venv/bin/python -m pip install --upgrade pip; \
	.venv/bin/python -m pip install uv; \
	fi

install:
	just ensure-uv
	.venv/bin/uv sync --extra dev
	(cd frontend && npm install)

backend:
	just ensure-uv
	.venv/bin/python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000

frontend:
	(cd frontend && npm run dev -- --host 0.0.0.0 --port 5173)

dev:
	just ensure-uv
	trap 'kill 0' EXIT
	.venv/bin/python -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000 &
	(cd frontend && npm run dev -- --host 0.0.0.0 --port 5173)

lint:
	just ensure-uv
	.venv/bin/python -m ruff check backend
	if [ -d "frontend" ]; then \
		(cd frontend && npm run lint); \
	fi

fmt:
	just ensure-uv
	.venv/bin/python -m ruff format backend
	if [ -d "frontend" ]; then \
		(cd frontend && npm run fmt); \
	fi

typecheck:
	just ensure-uv
	.venv/bin/python -m mypy backend

test:
	just ensure-uv
	.venv/bin/python -m pytest backend/tests

clean:
	rm -rf .venv uv.lock frontend/node_modules frontend/dist frontend/.vite
