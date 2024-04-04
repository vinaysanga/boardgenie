FROM eclipse-temurin:19.0.1_10-jdk-ubi9-minimal

WORKDIR /app

COPY . .

WORKDIR /app
RUN ./mvnw clean package

WORKDIR /app/target
CMD java -jar Boardgenie-0.0.1-SNAPSHOT.jar

EXPOSE 8080