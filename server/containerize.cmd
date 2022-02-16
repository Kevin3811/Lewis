call mvnw install
docker build --build-arg JAR_FILE=target/*.jar -t lewis-backend .