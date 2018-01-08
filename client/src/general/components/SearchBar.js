import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'

class SearchBar extends Component {
  state = { query: this.props.query || '' };

  componentWillReceiveProps({query: newQuery}) { 
    //we this component can receive a new query when SearchPage clicks the browser back button and changes url
    //we set query state to keep it in sync with the url
    if (newQuery !== this.props.query) this.setState({query: newQuery}) 
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.history.push('/search?query=' + this.state.query);
  }

  render () {
    return (
      <Form onSubmit={this.onSubmit}>
        <Input fluid action size='massive' placeholder='Search tweets...' value={this.state.query}
        onChange={(e, {value: query}) => this.setState({query})}>
          {this.props.inputLeft}
          <input type='text' /> {/*when using boolean action prop in Input, semantic requiresthis placeholder*/}
          <Button primary size='massive' icon='search' type='submit' />
        </Input>
      </Form>
    )
  }
}

export default withRouter(SearchBar);