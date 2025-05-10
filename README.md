# Full-Stack Docker-Compose Template (React, Express, MySQL, Redis)

### Purpose

This template is designed to help you practice backend services by setting up:

1. A **backend API**.

2. SQL statements for **CRUD** operations.

---

### Requirements

- **Docker**: Ensure that Docker is installed on your machine.

---

### Usage Instructions

1. **Rename the Environment File**

   Rename `.env.template` to `.env` and **modify** it as needed.

2. **Add Additional Packages**

   Add any required packages to `package.json` for your project.

3. **Start the Docker-Compose Services**

   You can start the services either in the **foreground** or **background** using the following commands:

   - `./run.sh up` → Starts the services in the foreground (blocks the terminal until the services stop).

   - `./run.sh up -d` → Starts the services in the background (free up terminal for other tasks).

4. **Stop the Services**

   To stop the services, use one of the following commands:

   - `./run.sh down` → Stops and removes all containers and the network.

   - `./stop.sh down -v` → Stops and removes all containers, the network, and volumes as well.
