import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Icon, Sticky, Image, Header} from 'semantic-ui-react';
import queryString from 'query-string';
import TweetsList from './TweetsList';
import SearchBar from '../general/components/SearchBar';
import './searchPage.css';
import '../app.css';

class SearchPage extends Component {

  state = {
    isStreaming: false,
    tweets: [],
  };
  //todo support back. if searching 1 then 2 then back to 1, it doesnt update

  componentDidMount () {
    this.props.socket.on('newTweet', tweet => this.setState({tweets: [tweet, ...this.state.tweets]}));
    this.search(this.getRouteQuery());
  }

  componentWillUnmount () { this.props.socket.emit('stopTweets') }

  getRouteQuery = () => queryString.parse(this.props.location.search).query;

  search = (query) => {
    if (!query) return;
    const { socket } = this.props
    this.state.isStreaming ? socket.emit('stopTweets') : this.setState({isStreaming: true});

    //note: multililne otherwise it goes over 120 chars
    this.state.tweets.length === 0 
    ? socket.emit('getTweets', query) 
    : this.setState({tweets: []}, () => socket.emit('getTweets', query));
  }

  stop = () => {
    this.props.socket.emit('stopTweets');
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

  //must use defined function property. inline function in render causes infinte loops for some reason
  setStickyRef = stickyRef => this.setState({stickyRef})

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
              <SearchBar inputLeft={this.renderStopButton()} onSearch={this.search} query={this.getRouteQuery()}/>
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