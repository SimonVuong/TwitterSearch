import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input } from 'semantic-ui-react'

class SearchPage extends Component {

  state = {
    search: '' //todo default to url path
  };

  search = async () => {
    try {

      const res = await fetch('/api/twitter', {method: 'post', body: this.state.search});
      if (!res.ok) throw new Error(res);
      console.log(await res.json());

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