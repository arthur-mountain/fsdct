# Full-stack services(React、Express、Mysql、Redis)

###### Purpose: 
    Focus on practice backend services.

    1. The backend api; 
    2. The SQL statements for CRUD;

---

Required:
  1. docker

---

Usage:
  1. Rename <b>`env.template`</b> to <b>`.env`</b> <b>`env.template`</b> to <b>`.dockerignore`</b>, and <b>`rewrite it`</b>.
  2. Add your `additional package to package.json`.
  3. Start the docker-compose services. 
  Use <b>the one of both</b> at bottom command.
    `docker-compose up -d`
    `docker-compose -f ./docker-compose.yml up -d`

  P.S. 
    1. If you add new package, `update the package.json` after `docker-compose up`.
    <b>`May should rebuild the image`</b>
    2. If you want to `use different language` to build frontend or backend,
            
    a. You should rewrite the `Dockerfile` in the builds
    b. You should create `your custom client or server fold` in the root directory
