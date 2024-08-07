FROM postgres

COPY ./init/init.sql /docker-entrypoint-initdb.d/init.sql

ENV POSTGRES_USER="kiyo"
ENV POSTGRES_PASSWORD="postgresPass"

EXPOSE 5432
