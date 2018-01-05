import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input } from 'semantic-ui-react'

class SearchPage extends Component {

  state = {
    search: '' //todo default to url path
  };

  search = async () => {
    try {
      const res = await fetch('/api/twitter', {
        method: 'post', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({track: this.state.search})
      });
      
      console.log(res.ok);

      if (!res.ok) throw new Error(res);

      // this.props.socket.on('newTweet', tweet => {
      //   console.log(tweet);
      // });

      // this.props.socket.on('destroy', () => {
      //   console.log('destroyed');
      // });

    } catch(e) {
      console.error(e);
    }
  }

  render() {
    return (
      <Grid centered padded='vertically'>
        <Grid.Column width={14}>
          <Input fluid action={{icon: 'search', color: 'primary', onClick: this.search}} placeholder='Search tweets...'
          value={this.state.search} onChange={({target: {value: search}}) => this.setState({search})}/>
        </Grid.Column>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <p>placeholder2</p>
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