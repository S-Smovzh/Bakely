heroku ps:scale web=0
heroku ps:scale worker=1
worker: webpack --mode production --config webpack.server.config.js && webpack --mode production --config webpack.prod.config.js && node ./dist/server.js
