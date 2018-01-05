import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Input } from 'semantic-ui-react'

class SearchPage extends Component {
  render() {
    return (
      <Grid centered padded='vertically'>
        <Grid.Column width={14}>
          <Input fluid action={{icon: 'search', color:'primary'}} placeholder='Search tweets...' />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <p>placeholder</p>
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