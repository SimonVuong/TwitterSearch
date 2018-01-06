import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Button, Icon } from 'semantic-ui-react';
import Header from '../general/components/Header';
import TweetsList from './TweetsList';

class SearchPage extends Component {

  state = {
    search: 'food', //todo default to url path
    isStreaming: false,
    tweets: []
  };

  componentDidMount () {
    this.props.socket.on('newTweet', tweet => this.setState({tweets: [tweet, ...this.state.tweets]}));
  }

  search = () => {
    const { socket } = this.props

    this.state.isStreaming ? socket.emit('stopTweets') : this.setState({isStreaming: true});

    //note: multililne otherwise it goes over 120 chars
    this.state.tweets.length === 0 
    ? socket.emit('getTweets', this.state.search) 
    : this.setState({tweets: []}, () => socket.emit('getTweets', this.state.search));
  }

  stop = () => {
    this.props.socket.emit('stopTweets');
    this.setState({isStreaming: false});
  }

  //note: defined within SearchPage component because it needs SearchPage state
  renderStopButton = () => (    
    this.state.isStreaming ?
    <Button negative icon labelPosition='left' onClick={this.stop} style={{'marginRight': '1em'}}>
      <Icon name='stop' />
      Stop feed
    </Button>
    : null
  )

  render() {
    return (
      <Grid container padded='vertically' columns={1}>
        <Grid.Column>
          <Header text='Search Live Tweets' icon='twitter' />
        </Grid.Column>
        <Grid.Column>
          <Input fluid action size='massive' placeholder='Search tweets...' value={this.state.search}
          onChange={({target: {value: search}}) => this.setState({search})}>
            {this.renderStopButton()}
            <input />
            <Button primary size='massive' icon='search' onClick={this.search}/>
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