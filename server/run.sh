poetry install
export PYTHONPATH="$PWD/server"
export DATABASE_URL=postgres://vadim:46zmGT3DncKd0S43rBhFY3gLJvsLU8YW@dpg-ckj3nlgmccbs73crpo20-a.oregon-postgres.render.com/analyzer_prod
psql -a -d $DATABASE_URL -f database.sql
poetry run uvicorn server.main:app --reload --host 0.0.0.0 --port 8000
