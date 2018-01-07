decisions:


src folder because i create react app needs a src folder. i originally wanted to do client folder isntead but not possible.
i was going to put src inside client but i wanted build to be top level instead of nested inside client

must have semantic folder inside source instead of client toplevel otherwise, react cannot import it. limitation
by cra


i left a lot of comments explaining my thought processes that may not be so obvious. these are rules and patterns that
i like to follow and incorporate in all my projects. i am flexible when working with a team however

be aware of twitter-rate limits. dont do too many saerches within a short period of time. if this happens. wait for a
few minutes. see

https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/connecting.html
Clients which do not implement backoff and attempt to reconnect as often as possible will have their connections rate limited for a small number of minutes. Rate limited clients will receive HTTP 420 responses for all connection requests.
Clients which break a connection and then reconnect frequently (to change query parameters, for example) run the risk of being rate limited.
Twitter does not make public the number of connection attempts which will cause a rate limiting to occur, but there is some tolerance for testing and development. A few dozen connection attempts from time to time will not trigger a limit. However, it is essential to stop further connection attempts for a few minutes if a HTTP 420 response is received. If your client is rate limited frequently, it is possible that your IP will be blocked from accessing Twitter for an indeterminate period of time.

run locally

npm start 
npm serve


features
background picture, with tweets in a gray box
sticky search
makesure i can search with enter button

shortcuts
npm run serve = babel-node but fast and easy for poc

css variables and settings are set in 
\client\src\semantic\src\site\globals\site.variables

if you change one while the program is running, it auto recompiles

i prefer inline styles when the style is specific to the component. id ont have to jump to anotiher file, then cross match
selectors and classnames. i can see eveyrthign there. sometimes though, there are styles that apply to multiple components
at which case i do use class names. i choose css for these kinds of style isntead of export react style objects because

1) css "are generally more efficient than inline styles" (from https://reactjs.org/docs/faq-styling.html)
2) i already have to go to a different file anyway so i might as well use className

i reserve app.css for such styles and leave semantic for theming and semantic specific
overrides.