#!/usr/bin/env bash

ROOT_DIR_NAME="$(dirname "$0")/.."

if [ -f "$ROOT_DIR_NAME/docker/postgresql/haproxy/haproxy.cfg" ]; then
  echo "haproxy.cfg already exist."
else
  set -a
  source "$ROOT_DIR_NAME/.env"
  set +a
  envsubst \
    <"$ROOT_DIR_NAME/docker/postgresql/haproxy/haproxy.cfg.template" \
    >"$ROOT_DIR_NAME/docker/postgresql/haproxy/haproxy.cfg"
fi
