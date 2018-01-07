import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export default class Searchbar extends Component {
  state = { query: this.props.query || '' };
  
  render () {
    const { query } = this.state;
    return (
      <Input fluid action size='massive' placeholder='Search tweets...' value={query}
      onChange={({target: {value: query}}) => this.setState({query})}>
        {this.props.inputLeft}
        <input />
        <Link to={{pathname: '/search', search: '?query=' + query}}>
          <Button primary size='massive' icon='search' onClick={event => {if (this.props.onSearch) this.props.onSearch(query)}}/>
        </Link>       
      </Input>
    )
  }
}