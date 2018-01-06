decisions:


src folder because i create react app needs a src folder. i originally wanted to do client folder isntead but not possible.
i was going to put src inside client but i wanted build to be top level instead of nested inside client

must have semantic folder inside source instead of client toplevel otherwise, react cannot import it. limitation
by cra


i left a lot of comments explaining my thought processes that may not be so obvious. these are rules and patterns that
i like to follow and incorporate in all my projects. i am flexible when working with a team however

run locally

npm start 
npm serve


features
background picture, with tweets in a gray box
sticky search
makesure i can search with enter button

shortcuts
npm run serve = babel-node but fast and easy for poc

https://scalegrid.io/blog/wp-content/uploads/2017/08/iStock-479893536.jpg

  "proxy": {
    "/api": {
      "target": "http://localhost:8080",
      "ws": true
    }
  },


    "serve": "babel-node --presets es2015,stage-0 -- server/server.js",
    "start-server": "nodemon server/server.js --exec babel-node --presets es2015,stage-0",
    "start-client": "react-scripts start",
    "watch-semantic": "gulp --gulpfile src/semantic/gulpfile.js watch",
    "start": "run-p start-server start-client watch-semantic",
    "build-css": "gulp --gulpfile src/semantic/gulpfile.js build-css",
    "build-assets": "gulp --gulpfile src/semantic/gulpfile.js build-assets",
    "prebuild": "run-s build-css build-assets",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"