docker container stop lewis-backend;
docker container rm lewis-backend;
docker run --name lewis-backend -d -p 8081:8081 -t lewis-backend;