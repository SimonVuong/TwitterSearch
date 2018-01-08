# TwitterSearch

Search tweets for a live feed. This is a small example of Simon's coding style and practices. This app uses an [express](https://github.com/expressjs/express) backend along with [socket.io](https://github.com/socketio/socket.io). The frontend was bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app) and 
uses [semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React) for styling.

## Getting started

Globally install [nodemon](https://github.com/remy/nodemon) and  [gulp](https://gulpjs.com/) for server watching and
semantic-ui builds respectively.

```
npm i nodemon -g
npm i gulp -g
```

Install server and client dependencies.

```
npm i
cd client
npm i
```

To start the server and client at the same time, return to project top level folder.

```
npm start
```

Good search terms include 'food', 'eat', 'basketball', and 'football'. Searches such as 'love' will create a feed that
is too fast and will cause the browser to be unresponsive. See below for more known bugs.
### Development

In development we run the backend Express server and frontend server separately. We proxy our webpack development server
to our express server within *client/package.json*

``` 
"proxy": {
  "/api": {
    "target": "http://localhost:8080"
  },
  "/socket.io": {
    "target": "ws://localhost:8080"
  }
}
```
## How I code

Throughout the app, you will see notes in the form of comments. These are personal notes to you explaining my less
obvious thought processes at that particular snippet of code. Because this project specifically serves as an evaluation
tool, I documented them here to give you an idea of my decision making process. I would not normally include them in my
other projects. All other comments (those not prefaced with `note:`) would be included in my normal projects.

*/client/src/general/reducers/socketReducer.js*

```
export default combineReducers({
  //note: put socket into redux store since it should be accessable throughout entire app  
  socket
});
```

Please keep in mind that this was an independent project. I am flexible when working with a team.

## Known bugs

1. Be aware of twitter-rate limits. Don't do too many searches within a short period of time. If this happens. wait for 
a few minutes. See [here](https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/connecting.html).

> Clients which do not implement backoff and attempt to reconnect as often as possible will have their connections rate limited for a small number of minutes. Rate limited clients will receive HTTP 420 responses for all connection requests.

>Clients which break a connection and then reconnect frequently (to change query parameters, for example) run the risk of being rate limited.
Twitter does not make public the number of connection attempts which will cause a rate limiting to occur, but there is some tolerance for testing and development. A few dozen connection attempts from time to time will not trigger a limit. However, it is essential to stop further connection attempts for a few minutes if a HTTP 420 response is received. If your client is rate limited frequently, it is possible that your IP will be blocked from accessing Twitter for an indeterminate period of time.

2. Sometimes the client will receive duplicate tweets with the same id,causing the browser to become unresponsive. It is potentially due to impropper socket/twitter connection closing, but requires further investigation. Temporarily fix by restarting server.
 This error is sometimes associated with the
following server error.
>(node:4784) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 error listeners added. Use emitter.setMaxListeners() to increase limit

3. When searching for really popular terms such as "love" or "life" the browser will stop responding due to high traffic. Temporarily fix by restarting server.

## Possible enhancements
1. Support multiple clients simultaneously
2. Input validation
3. Prop types
4. Create production build with `npm run build`