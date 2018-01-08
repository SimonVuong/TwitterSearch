import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Icon, Image, Sticky } from 'semantic-ui-react';
import queryString from 'query-string';
import TweetsList from './TweetsList';
import SearchBar from '../general/components/SearchBar';
import './searchPage.css';
import '../app.css';

class SearchPage extends Component {

  state = {
    isStreaming: false,
    tweets: [],
    currQuery: null
  };

  componentDidMount () {
    this.props.socket.on('newTweet', tweet => this.setState({tweets: [tweet, ...this.state.tweets]}));
    this.search(this.getRouteQuery(this.props.location));
  }

  componentWillUnmount () { this.props.socket.emit('stopTweets', this.state.currQuery) }

  componentWillReceiveProps({location: nextLocation}) {
    //intentionally checking objects. we want to know if this is a new location, whether the path is the same or not.
    //we have a location with the same path if SearchPage is currently streaming and we search the same query
    if (nextLocation !== this.props.location) this.search(this.getRouteQuery(nextLocation));
  }

  getRouteQuery = location => queryString.parse(location.search).query;

  //must use defined function property. inline function in render causes infinte loops for some reason
  setStickyRef = stickyRef => this.setState({stickyRef})

  search = (newQuery) => {
    console.log('going to search', newQuery); //for debugging
    if (!newQuery) return;

    const { socket } = this.props
    let newState = {currQuery: newQuery};
    this.state.isStreaming ? socket.emit('stopTweets', this.state.currQuery) : newState.isStreaming = true;

    if (this.state.tweets.length === 0) {
      socket.emit('getTweets', newQuery);
      this.setState(newState);
    } else {
      this.setState({tweets: [], ...newState}, () => socket.emit('getTweets', newQuery));
    }
  }

  stop = () => {
    this.props.socket.emit('stopTweets', this.state.currQuery);
    this.setState({isStreaming: false});
  }

  //note: defined within SearchPage component because it needs SearchPage state. using separate fn instead of ternary
  //inside renderSearchBar for easier readability. multiline ternaries are difficult to read when surrounded by tags
  renderStopButton = () => (
    //must use className to add styles here because we need to use !important and inlineStyles dont support !important
    this.state.isStreaming ?
    <Button negative icon type='button' size='big' labelPosition='left' className='stopButton' onClick={this.stop}>
      <Icon name='stop' size='large' style={{width: '1.5em'}}/>
      Stop feed
    </Button>
    : null
  )

  render() {
    return (
      <div ref={this.setStickyRef} className='cloudsBackground' style={{backgroundAttachment: 'fixed'}}>
        <Grid container padded='vertically' columns={1} style={{backgroundColor: 'white'}}>
          <Grid.Column style={{paddingBottom: 0}}>
          <Header as='h1' textAlign='center'>
            <Image src='/smallBird.png' />{'Live Tweets'}
          </Header>
          </Grid.Column>
          <Grid.Column style={{paddingTop: 0}}>
            <Sticky context={this.state.stickyRef} className='sticky'>
              <SearchBar inputLeft={this.renderStopButton()} onSearch={this.search} query={this.getRouteQuery(this.props.location)}/>
            </Sticky>
          </Grid.Column>
          <Grid.Column>
            <TweetsList tweets={this.state.tweets}/>              
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({socket}) => ({
  socket
})

export default connect(mapStateToProps)(SearchPage);