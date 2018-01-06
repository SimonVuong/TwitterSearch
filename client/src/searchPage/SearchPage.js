import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Button } from 'semantic-ui-react';
import TweetsList from './TweetsList';

class SearchPage extends Component {

  state = {
    search: 'food', //todo default to url path
    tweets: []
  };

  search = () => {
    this.props.socket.emit('getTweets', this.state.search);
    this.props.socket.on('newTweet', tweet => this.setState({tweets: [tweet, ...this.state.tweets]}));
  }

  render() {
    return (
      <Grid container padded='vertically' columns={1}>
        <Grid.Column>
          <Input fluid action={{icon: 'search', color: 'primary', onClick: this.search}} placeholder='Search tweets...'
          value={this.state.search} onChange={({target: {value: search}}) => this.setState({search})}/>
        </Grid.Column>
        <Grid.Column>
          <Button onClick={() => this.props.socket.emit('stopTweets')}>Stop</Button>
        </Grid.Column>
        <Grid.Column>
          <TweetsList tweets={this.state.tweets}/>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({socket}) => ({
  socket
})

export default connect(mapStateToProps)(SearchPage);