import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Button, Icon } from 'semantic-ui-react';
import TweetsList from './TweetsList';

class SearchPage extends Component {

  state = {
    search: 'food', //todo default to url path
    isStreaming: false,
    tweets: []
  };

  search = () => {
    this.props.socket.emit('getTweets', this.state.search);
    this.setState({isStreaming: true});
    this.props.socket.on('newTweet', tweet => this.setState({tweets: [tweet, ...this.state.tweets]}));
  }

  stop = () => {
    this.props.socket.emit('stopTweets');
    this.setState({isStreaming: false});
  }

  //defined within SearchPage component because it needs SearchPage state
  renderStopButton = () => (
    this.state.isStreaming ? 
    <Button negative icon labelPosition='left'
    onClick={this.stop} style={{'margin-right': '1em'}}>
        <Icon name='stop' />
        Stop feed
    </Button> : null
  )

  //todo handle scenario when i click saerch twice
  render() {
    return (
      <Grid container padded='vertically' columns={1}>
        <Grid.Column>
          <Input fluid action placeholder='Search tweets...'
          value={this.state.search} onChange={({target: {value: search}}) => this.setState({search})}>
            {this.renderStopButton()}
            <input />
            <Button primary icon='search' onClick={this.search}/>
          </Input>
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