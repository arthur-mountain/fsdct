# Full-Stack Docker-Compose Template(React、Express、Mysql、Redis)

###### Purpose:
    Focus on practice backend services.

    1. The backend api;
    2. The SQL statements for CRUD;

---

Required:
  1. docker

---

Usage:
  1. Rename <b>`.env.template`</b> to <b>`.env`</b>, and <b>`rewrite it`</b>.
  2. Add your `additional package to package.json`.
  3. Start the docker-compose services.
  Use <b>the one of both</b> at bottom command.
    `docker-compose up -d`
    `docker-compose -f ./docker-compose.yml up -d`
  4. Stop command:
  Use <b>the one of both</b> at bottom command.
    `docker-compose down` -> Remove all of container, network.
    `docker-compose down -v` -> As the same of top command, but also will remove volumes too.

P.S.
  1. If you add new package, `update the package.json` after `docker-compose up`.<b>`May should rebuild the image`</b>
  
    Replace ${service-name} of the bottom commands to the service name in the docker-compose.yml

    docker-compose build ${service-name} --no-cache

    docker-compose -f ./docker-compose.yml build ${service-name} --no-cache
  2. If you want to `use different language` to build frontend or backend,
          
    a. You should rewrite the `Dockerfile` in the builds
    b. You should create `your custom client or server fold` in the root directory
