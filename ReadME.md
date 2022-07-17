# Node + Create React App + Docker Compose

A project that runs a Node server and a create-react-app app via two separate containers, using Docker Compose.

If docker is down or not working please refer to ReadMe in server and client folder

## Development

```
docker-compose up
```

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yaml` file.

The client server is spun up at `localhost:4001` and it proxies internally to the server using the linked name as `server:8282`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

### Notes

````
docker is not fully tested i'm working with old pc with widows :D

### Installing npm dependencies


```



### Using make

I have `make` on my computer (by default in any linux distribution i think).

Start first time to build node images one time is good :

```
make dockerFirstInit
 ==> docker-compose build
```
make up to start
==> docker-compose down &&  docker-compose -f docker-compose.yaml up -d
```
make down:
docker-compose down

make testServer:

make testClient:
````
