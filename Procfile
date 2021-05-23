web: PORT=$PORT node dist/server.js
heroku ps:scale web=0
heroku ps:scale worker=1
worker: PORT=$PORT node dist/server.js
