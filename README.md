# Backend Structure Homework

### :bangbang: Attention  :bangbang:
**The code was written by the professionals for educational purposes. Don't repeat at home.**

### Prerequisites:
1. `npm install` - install packages
2.  Create `.env` file, copy values from `.example.env`

## Start server options (pick one):

### Option 1:
#### To run the server with a containerized database:
1. `npm run docker:dev:db` - create and start a database in docker container
2. `npm run migrate:latest && npm run seed` - apply the migrations. Run only once, next time you start the server - skip this step
3. `npm run dev` - run the server

### Option 2:
#### To run the server with a system DB instance:
1. Download and install the official Postgres **v.12** package for your OS - https://www.postgresql.org/download/
2. Using a DB observer tool (PGAdmin, Dbeaver, etc.) create a database
3. Update the `.env` with the relevant values:
   * `DATABASE_PORT` (default during installation is `5432`)
   * `DATABASE_NAME` (name of a newly created database)
   * `DATABASE_USER` (default username during installation is `postgres`)
   * `DATABASE_ACCESS_KEY` (password to the `postgres` user, which was also set during installation)
4. `npm run migrate:latest && npm run seed` - apply the migrations. Run only once, next time you start the server - skip this step
5. `npm run dev` - run the server

## Verify the setup is working as expected:
1. Make sure the server is not running (stop the `npm run dev` process)
2. `npm run test` - tests should be all passing

* Alternatively, to run the tests under the fully containerized environment:
1. `npm run docker:test` - bring up the database and server within a docker environment, run the tests, then stop the server container.<br/>Please note, the `hw_db_test` container will still be running.

### Troubleshooting:
* __Issue__: running the `npm run docker:test` command fails with:
```log
1 error occurred:
        * checking context: can't stat ...
```
* __Solution__: run `sudo chown -R $USER .docker_pgdata_test/` in terminal, while on the repo top level
* __Another solution__: drop all related existing containers and re-run the command
---
* __Issue__: running the `npm run docker:test` command fails with:
```log
failed to solve: failed to solve with frontend dockerfile.v0: failed to build LLB: 
  error from sender: 
    open ./lecture-starter-backend-structure/.docker_pgdata: permission denied
```
* __Solution__: apparently, the `docker:dev:db` command was invoked before, which conflicts with the previously created container data. Simply delete the pg related folder `sudo rm -rf ./docker_pgdata`
