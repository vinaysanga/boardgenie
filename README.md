# Boardgenie

A simple to-do board. 
This is just a hobby project that I created to explore spring-boot and next.js in detail.

## Features
- Create and manage a To-do task.
- Uses database to store the tasks.
- Standalone java project. You can run the entire webapp just with the jar file.

## Requirements
- Java 19.0.1 or higher.

## Running the app
### A. Using docker:
The app is containerized, and can be built and run as follows:
1. Clone the repository.
   ```shell
   git clone https://github.com/vinaysanga/boardgenie.git

   cd boardgenie
   ```
2. Build the image.
```shell
docker build -t boardgenie . 
```
3. Run the image. The following command maps the container port `8080` to your local port `8080`. \
Please change the port if you get conflicts.
```shell
docker run -dp 8080:8080 boardgenie
```

### B. Locally using Java
1. Clone the repository.
   ```shell
   git clone https://github.com/vinaysanga/boardgenie.git
   ```
2. Go to the directory and build the jar.
   ```shell
   cd boardgenie
   ./mvnw clean package
    ```
3. Run the jar file as follows:
   ```shell
   cd target
   java -jar Boardgenie-0.0.1-SNAPSHOT.jar
   ```
4. Access the application at http://localhost:8080/
5. Fin.
