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