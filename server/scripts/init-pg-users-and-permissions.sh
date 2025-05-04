#!/usr/bin/env bash

ROOT_DIR_NAME="$(dirname "$0")/.."

if [ -f "$ROOT_DIR_NAME/migrations/postgresql/users-and-permissions.sql" ]; then
  echo "User and permissions already exist."
else
  set -a
  source "$ROOT_DIR_NAME/.env"
  set +a
  envsubst \
    <"$ROOT_DIR_NAME/migrations/postgresql/templates/users-and-permissions" \
    >"$ROOT_DIR_NAME/migrations/postgresql/users-and-permissions.sql"
fi
