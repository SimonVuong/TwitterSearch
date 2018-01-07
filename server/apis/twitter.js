import TwitterApi from 'node-tweet-stream';

//todo: in real app, use env variables. keys hardcoded now for ease.
const twitter = new TwitterApi({
  consumer_key: 'VL955x7FK4TIJOVjViMNuiJu5',
  consumer_secret: 'AleVzUT1WgrY1oDEFF5ibwHa2PScKfzB5l7lfvneElskkZSvMJ',
  token: '3069196610-zX6WN8ZvXYAhjd4yRLX3L5rFMu2oMrIGmgN46aq',
  token_secret: 'KRc3oQbzzJCAr9YE4Qzh4BcUjzPgEtpGmsYKQ2NLNCqLl'
});

export const enableTwitterStream = socket => {
  socket.on('connection', client => {
    console.log('client connected', )
    client.on('getTweets', query => {
      console.log('tracking', query);
      twitter.track(query);
    });

    client.on('stopTweets', query => {
      console.log('untracked', query);
      twitter.untrack(query);
    })

    client.on('disconnect', () => {
      console.log('client disconnected');
      twitter.untrackAll();
      twitter.abort();
    });

    twitter.on('tweet', tweet => {
      console.log(tweet.id_str);
      //todo if we stream "love"  the socket can't handle the traffic....
      client.emit('newTweet', {
        id: tweet.id_str, //using str as recommended by twitter api. numbers too large may cause bugs in js
        timestamp: tweet.timestamp,
        text: tweet.text,
        username: tweet.user.screen_name,
        avatar: tweet.user.profile_image_url,
        // location: tweet.place.full_name
      });
    })

    twitter.on('error', err => console.err('got twitter error', err))
  });
}