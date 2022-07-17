# If docker not working sorry but don't worry

this a standard react create app without any extra configuration
the only update is to switch REACT_APP_API_URL from docker to without docker in .env file :

```
#api url without docker
REACT_APP_API_URL=http://localhost:8080
#api url with docker
#REACT_APP_API_URL=http://localhost:8282
```

## run the app

yarn install && yarn start

### run the test

yarn test
