ARG POSTGRES_VERSION=17
ARG ALPINE_VERSION

FROM postgres:$POSTGRES_VERSION-alpine$ALPINE_VERSION AS builder

RUN apk add --no-cache build-base \
    postgresql-dev \
    wget \
    unzip \
    flex \
    krb5-dev \
    clang19 \
    llvm19

WORKDIR /pgext

ARG PG_TLE_VERSION=1.4.0
RUN wget "https://github.com/aws/pg_tle/archive/refs/tags/v${PG_TLE_VERSION}.zip" -O v${PG_TLE_VERSION}.zip
RUN unzip v${PG_TLE_VERSION}.zip
WORKDIR /pgext/pg_tle-${PG_TLE_VERSION}
RUN make && make install

FROM postgres:$POSTGRES_VERSION-alpine$ALPINE_VERSION

COPY --from=builder /usr/local/lib/postgresql /usr/local/lib/postgresql
COPY --from=builder /usr/local/share/postgresql/extension/ /usr/local/share/postgresql/extension/

RUN rm -vrf /var/cache/apk/*
