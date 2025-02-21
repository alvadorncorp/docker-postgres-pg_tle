ARG POSTGRES_VERSION=17
ARG DEBIAN_VERSION=bookworm

FROM postgres:$POSTGRES_VERSION-$DEBIAN_VERSION AS builder

ARG POSTGRES_MAJOR=17
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    postgresql-server-dev-$POSTGRES_MAJOR \
    wget \
    unzip \
    flex \
    libkrb5-dev \
    ca-certificates \
    clang-19 \
    llvm-19

WORKDIR /pgext

ARG PG_TLE_VERSION=1.4.0
RUN wget "https://github.com/aws/pg_tle/archive/refs/tags/v${PG_TLE_VERSION}.zip" -O v${PG_TLE_VERSION}.zip
RUN unzip v${PG_TLE_VERSION}.zip
WORKDIR /pgext/pg_tle-${PG_TLE_VERSION}
RUN make && make install

FROM postgres:$POSTGRES_VERSION-$DEBIAN_VERSION

ARG POSTGRES_MAJOR=17

COPY --from=builder /usr/lib/postgresql/$POSTGRES_MAJOR/lib /usr/lib/postgresql/$POSTGRES_MAJOR/lib
COPY --from=builder /usr/share/postgresql/$POSTGRES_MAJOR/extension/ /usr/share/postgresql/$POSTGRES_MAJOR/extension/
