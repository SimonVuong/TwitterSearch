import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'

class SearchBar extends Component {
  state = { query: this.props.query || '' };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.history.push('/search?query=' + this.state.query);
  }

  componentWillReceiveProps({query: nextQuery}) { 
    if (nextQuery !== this.props.query) this.setState({query: nextQuery}) 
  }

  render () {
    return (
      <Form onSubmit={this.onSubmit}>
        <Input fluid action size='massive' placeholder='Search tweets...' value={this.state.query}
        onChange={(e, {value: query}) => this.setState({query})}>
          {this.props.inputLeft}
          <input type='text' />
          <Button primary size='massive' icon='search' />
        </Input>
      </Form>
    )
  }
}

export default withRouter(SearchBar);