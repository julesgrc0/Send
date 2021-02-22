# Send


## Setup

```cmd
npm i
```

### Run

Test application design 

```cmd
ng serve
```

### Build

```cmd
@echo off
ng build --prod && copy main.js dist/main.js && npm i socket.io express && node main.js
```

### Deploy


> Heroku

Setup package.json
```cmd
cd dist/ && npm init --yes && npm i socket.io express && touch Procfile
```

Procfile:
```cmd
web: npm start
```
Upload:
```cmd
heroku login
heroku git:clone -a <name>
git add .
git commit -am "Upload"
git push heroku master
```

