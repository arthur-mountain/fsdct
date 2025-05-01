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

   - `./start.sh` → Starts the services in the foreground (blocks the terminal until the services stop).

   - `./start.sh -d` → Starts the services in the background (free up terminal for other tasks).

4. **Stop the Services**

   To stop the services, use one of the following commands:

   - `./stop.sh` → Stops and removes all containers and the network.

   - `./stop.sh -v` → Stops and removes all containers, the network, and volumes as well.

---

### Notes

1. **Adding New Packages**

   After adding any new packages to `package.json`, run `./start.sh` again. You **may need to rebuild the images** by running the following commands:

   ```bash
   docker-compose build ${service-name} --no-cache
   ```

   Alternatively, if using a custom Docker Compose file:

   ```bash
   docker-compose -f ${docker-compose-file} build ${service-name} --no-cache
   ```

2. **Customizing with Different Languages**

   If you want to use a different language for either the frontend or the backend, simply modify the service definitions in the `docker-compose.yml` file according to your needs.
