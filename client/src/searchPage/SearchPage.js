import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Button, Icon, Sticky, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import TitleHeader from '../general/components/Header';
import TweetsList from './TweetsList';
import './searchPage.css';

class SearchPage extends Component {

  state = {
    search: 'food', //todo default to url path
    isStreaming: false,
    tweets: [],
    hasSearched: false
  };

  componentDidMount () {
    this.props.socket.on('newTweet', tweet => this.setState({tweets: [tweet, ...this.state.tweets]}));
    const { search } = queryString.parse(this.props.location.search);

    //todo bring this back before submission
    // if (search) this.setState({search}, this.search);

    if (search) this.setState({search});
  }

  search = () => {
    if (!this.state.hasSearched) this.setState({hasSearched: true});

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

  //note: defined within SearchPage component because it needs SearchPage state. using separate fn instead of ternary
  //inside renderSearchBar for easier readability. multiline ternaries are difficult to read when surrounded by tags
  renderStopButton = () => (
    //must use className to add styles here because we need to use !important and inlineStyles dont support !important
    this.state.isStreaming ?
    <Button negative icon size='big' labelPosition='left' className='stopButton' onClick={this.stop}>
      <Icon name='stop' size='large' style={{width: '1.5em'}}/>
      Stop feed
    </Button>
    : null
  )

  renderSearchBar = () => (
    <Input fluid action size='massive' placeholder='Search tweets...' value={this.state.search}
    onChange={({target: {value: search}}) => this.setState({search})}>
      {this.renderStopButton()}
      <input />
      <Link to={{pathname: '/', search: '?search=' + this.state.search}}>
        <Button primary size='massive' icon='search' onClick={this.search}/>
      </Link>       
    </Input>
  )

  //must use defined function property. inline function in render causes infinte loops for some reason
  setStickyRef = stickyRef => this.setState({stickyRef})

  render() {
    const background = {
      minHeight: '100vh', 
      backgroundImage: 'url("/clouds.svg")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }
    const title = 'Search Live Tweets';

    return (
      this.state.hasSearched ?
      <div ref={this.setStickyRef} style={background}>
        <Grid container padded='vertically' columns={1} style={{backgroundColor: 'white'}}>
          <Grid.Column style={{paddingBottom: 0}}>
            <TitleHeader text={title} image='/smallBird.png' />
          </Grid.Column>
          <Grid.Column style={{paddingTop: 0}}>
            <Sticky context={this.state.stickyRef} className='sticky'>
              {this.renderSearchBar()}
            </Sticky>
          </Grid.Column>
          <Grid.Column>
            <TweetsList tweets={this.state.tweets}/>              
          </Grid.Column>
        </Grid>
      </div>
      :
      //marginTop necessary because default is -1rem which causes white space on the bottom of page
      <Grid centered style={{marginTop: 0, ...background}}>
        {/*note: ideally this image woudl be part of background so it doenst move with window. would use photo editing
        tool to combine image and bg for a real app*/}
        <Image src='/bigBird.png' style={{position: 'absolute', bottom: 0, left: 0}}/>
        <Grid.Column mobile={14} tablet={14} computer={10} textAlign='center' style={{paddingLeft: 0, paddingTop: '10em'}}>
          <h1 style={{fontSize:'5em'}}>{title}</h1>
          {this.renderSearchBar()}
        </Grid.Column>
        <div style={{position: 'fixed', bottom: 0, right: 0}}>
          <a href="https://www.freevector.com/singing-twitter-bird-vector">FreeVector.com (bird)</a> {' '}
          <a href="https://www.freevector.com/free-cartoon-clouds-vector-19875">FreeVector.com (clouds)</a>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = ({socket}) => ({
  socket
})

export default connect(mapStateToProps)(SearchPage);