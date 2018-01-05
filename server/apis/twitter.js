import app from '../app';
import TwitterApi from 'twitter';

//todo: use env vars here. hardcoded for now for ease.
const twitter = new TwitterApi({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});


//todo explain why im using post. something to do with large queries....
app.post('/twitter', function(req, res, next) {
  const stream = twitter.stream('statuses/filter', {track: req.body.val});

  stream.on('data', data => {
    console.log(data);
  });

  stream.on('destroy', () => io.emit('stream:destroy'));

  //todo might not need this
  stream.on('end', () => io.emit('stream:destroy'));
  
  res.sendStatus(200);
});