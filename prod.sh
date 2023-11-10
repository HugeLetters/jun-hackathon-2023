(PORT=5173 node ./client/build) &
(cd ./server && poetry run uvicorn server.main:app --host 0.0.0.0 --port 8000) &
(adduser --system --no-create-home --shell /bin/false --group --disabled-login nginx && nginx -g "daemon off;") &
wait
