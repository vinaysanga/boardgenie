# Boardgenie

---
A simple to-do board. 
This is just a hobby project that I created to explore spring-boot and next.js in detail.

## Features:
- Create and manage a To-do task.
- Uses database to store the tasks.
- Standalone java project. You can run the entire webapp just with the jar file.

## Usage:
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