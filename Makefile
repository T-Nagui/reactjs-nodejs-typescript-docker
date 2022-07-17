cmd=""
path="src"
OS := $(shell uname)
cp = ""

up:
	docker-compose down &&  docker-compose -f docker-compose.yaml up -d

dockerFirstInit:
	docker-compose build && make up

down:
	docker-compose down

testServer:
	docker  exec -it server bash -c "cd /usr/app && yarn test"

testClient:
	docker  exec -it client bash -c "cd /usr/app && yarn test"