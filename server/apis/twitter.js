import TwitterApi from 'twitter';
import { socket } from '../server';

//todo: in real app, use env variables. keys hardcoded now for ease.
const twitter = new TwitterApi({
  consumer_key: 'VL955x7FK4TIJOVjViMNuiJu5',
  consumer_secret: 'AleVzUT1WgrY1oDEFF5ibwHa2PScKfzB5l7lfvneElskkZSvMJ',
  access_token_key: '3069196610-zX6WN8ZvXYAhjd4yRLX3L5rFMu2oMrIGmgN46aq',
  access_token_secret: 'KRc3oQbzzJCAr9YE4Qzh4BcUjzPgEtpGmsYKQ2NLNCqLl'
});

export default function createTwitterApi (app) {
  //configured as post to handle more request params. twitter rejects GET for excessive url length from too many params
  app.post('/api/twitter', async (req, res, next) => {
    try {
      const stream = await twitter.stream('statuses/filter', {track: req.body.track});

      stream.on('error', error => {
        console.log('got twitter error');
        console.log(error);
      });

      stream.on('data', tweet => {
        console.log(tweet);
        // socket.emit('newTweet', JSON.parse(tweet));
      });
  
      stream.on('end', () => io.emit('destroy'));
      
      res.sendStatus(200);
    } catch (e) {
      console.log('regular error');;
      res.sendStatus(500)
    }
  });
}