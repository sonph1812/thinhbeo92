# Database (Development)

1. Push migration run to database

```shell
npm run typeorm:cli migration:run
```

2. Revert last migration

```shell
npm run typeorm:cli migration:revert
```

3. Create new migration (when change entities)

```shell
npm run migration-generate migrations/{{name}}
```

### setup rabbit mq

Create file `./rabbitmq/rabbitmq.conf`. Note: chaun user/pass for PROD

```conf
loopback_users.guest = false
listeners.tcp.default = 5672
disk_free_limit.absolute = 1GB
default_user = guest
default_pass = guest
```

### Docker (Run) - Production

1. Create required files:
   - secrets/db-password
   - secrets/rabbitmq-password
2. Start nescessary service: `docker-compose up`
