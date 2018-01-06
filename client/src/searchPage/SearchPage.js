import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Button } from 'semantic-ui-react'
class SearchPage extends Component {

  state = {
    search: '', //todo default to url path
    tweets: []
  };

  search = () => {
    this.props.socket.emit('getTweets', this.state.search);
    this.props.socket.on('newTweet', tweet => {
      const tweets = this.state.tweets;
      tweets.unshift(tweet);
      this.setState({tweets});
    });
  }

  render() {
    return (
      <Grid centered padded='vertically'>
        <Grid.Column width={14}>
          <Input fluid action={{icon: 'search', color: 'primary', onClick: this.search}} placeholder='Search tweets...'
          value={this.state.search} onChange={({target: {value: search}}) => this.setState({search})}/>
        </Grid.Column>
        <Grid.Row>
          <Button onClick={this.props.socket.emit('stopTweets')}>Stop</Button>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            {this.state.tweets.map((tweet, index) => <div key={index}>{tweet}</div>)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({socket}) => ({
  socket
})

export default connect(mapStateToProps)(SearchPage)