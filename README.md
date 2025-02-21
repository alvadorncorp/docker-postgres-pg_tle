# Docker PostgreSQL with pg\_tle

This repository contains Dockerfiles for building PostgreSQL images with the `pg_tle` (Trusted Language Extensions) extension.

## Available Images

Images are built for the following combinations of PostgreSQL versions and operating systems:

*   PostgreSQL: Latest versions (defined in `.github/workflows/generate-matrix.yml`)
*   Operating Systems:
    *   Debian (versions defined in `.github/workflows/generate-matrix.yml`)
    *   Alpine (versions defined in `.github/workflows/generate-matrix.yml`)

## How to Build

### Manual Build

You can build the images manually using Docker:

1.  Clone this repository:

```bash
git clone https://github.com/alvadorn/docker-postgres-pg_tle.git
cd docker-postgres-pg_tle
```

2.  Build the desired image (example for PostgreSQL 15 and Debian 12):

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t alvadorncorp/postgres-pg_tle:15-debian12 --build-arg POSTGRES_VERSION=15 --build-arg POSTGRES_MAJOR=15 --build-arg DEBIAN_VERSION=12 -f debian/Dockerfile .
```

Change the values of the build arguments (`POSTGRES_VERSION`, `POSTGRES_MAJOR`, `DEBIAN_VERSION` or `ALPINE_VERSION`) and the Dockerfile name (`debian/Dockerfile` or `alpine/Dockerfile`) as needed.

## License

This project is licensed under the [MIT License](LICENSE).