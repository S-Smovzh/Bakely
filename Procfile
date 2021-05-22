web: webpack --mode production --config webpack.prod.config.js && webpack --mode production --config webpack.server.config.js && node ./dist/server.js

heroku ps:scale web=0
heroku ps:scale worker=1
worker: node src/index.js
