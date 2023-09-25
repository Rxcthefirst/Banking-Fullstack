1. Run docker image
`docker run --rm --name postgres -e POSTGRES_PASSWORD=root -d -v $HOME/srv/postgres:/var/lib/postgresql/data -p 5432:5432 postgres`

### Stopping PostgreSQL
`docker stop postgres`

### Logging into Database
* `psql -h localhost -U postgres -p 5432 -d postgres`

### Creating starter data
1. `psql -h localhost -U postgres -p 5432 -f database.sql`
2. `psql -h localhost -U postgres -p 5432 -d postgres -f customers.sql`
3. `psql -h localhost -U postgres -p 5432 -d postgres -f accounts.sql`
3. `psql -h localhost -U postgres -p 5432 -d postgres -f transactions.sql`


docker run --rm --name postgres -e POSTGRES_PASSWORD=root -d -p 5432:5432 postgres
