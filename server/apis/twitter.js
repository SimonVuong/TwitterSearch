import TwitterApi from 'twitter';

//todo: in real app, use env variables. keys hardcoded now for ease.
const twitter = new TwitterApi({
  consumer_key: 'VL955x7FK4TIJOVjViMNuiJu5',
  consumer_secret: 'AleVzUT1WgrY1oDEFF5ibwHa2PScKfzB5l7lfvneElskkZSvMJ',
  access_token_key: '3069196610-zX6WN8ZvXYAhjd4yRLX3L5rFMu2oMrIGmgN46aq',
  access_token_secret: 'KRc3oQbzzJCAr9YE4Qzh4BcUjzPgEtpGmsYKQ2NLNCqLl'
});

export const enableTwitterStream = socket => {
  socket.on('connection', client => client.on('getTweets', (terms) => streamTweets(terms, client)));
}

const streamTweets = async (terms, client) => {
  try {
    const tweatStream = await twitter.stream('statuses/filter', {track: terms});

    tweatStream.on('data', tweet => {
      console.log(tweet.text);
      client.emit('newTweet', tweet.text);
    });

    client.on('stopTweets', () => {
      tweatStream.destroy();
    });

    tweatStream.on('error', error => {
      console.error('twitter stream error', error);
      //todo send error back to client
    });

    tweatStream.on('end', () => {
      console.log('twitter stream ended');
      //send error back to client
    });

  } catch (e) {
    //todo send error back to client
    console.error('twitter connection error');
  }
}