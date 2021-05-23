web: PORT=$PORT npm start
heroku ps:scale web=0
heroku ps:scale worker=1
worker: PORT=$PORT npm start
