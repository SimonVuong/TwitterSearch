import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Image, Button, Icon, Sticky} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import Header from '../general/components/Header';
import TweetsList from './TweetsList';
import './searchPage.css';

class SearchPage extends Component {

  state = {
    search: 'food', //todo default to url path
    isStreaming: false,
    tweets: [],
    stickyRef: null
  };

  componentDidMount () {
    this.props.socket.on('newTweet', tweet => this.setState({tweets: [tweet, ...this.state.tweets]}));
    const { search } = queryString.parse(this.props.location.search);

    //todo bring this back before submission
    // if (search) this.setState({search}, this.search);

    if (search) this.setState({search});
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

  //must use defined function property. inline function in render causes infinte loops for some reason
  setStickyRef = stickyRef => this.setState({stickyRef})

  //todo give background credit <a href="https://www.freevector.com/free-cartoon-clouds-vector-19875">FreeVector.com</a>
  render() {
    const style = {
      minHeight: '100vh', 
      backgroundImage: 'url("/clouds.svg")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }
    
    return (
      <div ref={this.setStickyRef} style={style}>
        <Grid container padded='vertically' columns={1} style={{backgroundColor: 'white'}}>
          <Grid.Column style={{paddingBottom: 0}}>
            <Header text='Search Live Tweets' image='/blueBirdCrop.png' />
          </Grid.Column>
          <Grid.Column style={{paddingTop: 0}}>
            <Sticky context={this.state.stickyRef} className='sticky'>
              <Input fluid action size='massive' placeholder='Search tweets...' value={this.state.search}
              onChange={({target: {value: search}}) => this.setState({search})}>
                {this.renderStopButton()}
                <input />
                <Link to={{pathname: '/', search: '?search=' + this.state.search}}>
                  <Button primary size='massive' icon='search' onClick={this.search}/>
                </Link>       
              </Input>
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