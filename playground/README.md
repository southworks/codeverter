# Codeverter Playground react application

To run locally

```
# install the web server globaly
npm install -g http-server

# compile codeverter package (Temporal until package were published)
cd ./codeverter
npm install && npm run build:prod

# go to playground folder and build
cd ./playground
npm install && npm run build

# go to build folder and start the server
cd ./build
http-server
```
