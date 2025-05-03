ARG POSTGRES_IMAGE

FROM alpine:3.20.3 as prep
WORKDIR /prep
COPY ./migrations ./migrations
RUN envsubst \
  <./migrations/postgresql/users-and-permissions.template \
  >./migrations/postgresql/users-and-permissions.sql
RUN mkdir docker-entrypoint && \
  cp \
  ./migrations/postgresql/*.sql \
  ./docker-entrypoint

FROM "$POSTGRES_IMAGE"
COPY --from=prep /prep/docker-entrypoint /docker-entrypoint-initdb.d
