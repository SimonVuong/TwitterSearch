import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Button, Icon } from 'semantic-ui-react';
import Header from '../general/components/Header';
import TweetsList from './TweetsList';
import './searchPage.css';

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
    //must use className to add styles here because we need to use !important and inlineStyles dont support !important
    this.state.isStreaming ?
    <Button negative icon size='big' labelPosition='left' className='stopButton' onClick={this.stop}>
      <Icon name='stop' size='large' style={{width: '1.5em'}}/>
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