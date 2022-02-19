docker container stop lewis-frontend;
docker container rm lewis-frontend;
docker run --name lewis-frontend -d -p 80:80 -p 443:443 lewis-frontend;