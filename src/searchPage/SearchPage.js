import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react'

class SearchPage extends Component {
  render() {
    return (
      <div>
        <Input action={{ icon: 'search' }} placeholder='Search...' />
      </div>
    );
  }
}

const mapStateToProps = ({socket}) => ({
  socket
})

export default connect(mapStateToProps)(SearchPage)