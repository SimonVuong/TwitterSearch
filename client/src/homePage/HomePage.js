import React, { Component } from 'react';
import { Grid, Image} from 'semantic-ui-react';
import SearchBar from '../general/components/SearchBar';
import '../app.css';

export default class HomePage extends Component {

  state = { search: '' };

  render() {
    return (
      // marginTop necessary because grid default is -1rem which causes white space on the bottom of page      
      <Grid centered className='cloudsBackground' style={{marginTop: 0}}>
        {/*note: ideally this image would be part of background so it doesn't move with window. would use photo editing
        tool to combine image and bg for a real app*/}
        <Image src='/bigBird.png' style={{position: 'absolute', bottom: 0, left: 0}} />
        <Grid.Column mobile={14} tablet={14} computer={10} textAlign='center' style={{paddingLeft: 0, paddingTop: '10em'}}>
          <h1 style={{fontSize:'5em'}}>Search Live Tweets</h1>
          <SearchBar />
        </Grid.Column>
        <div style={{position: 'fixed', bottom: 0, right: 0}}>
          <a href="https://www.freevector.com/singing-twitter-bird-vector">FreeVector.com (bird)</a> {' '}
          <a href="https://www.freevector.com/free-cartoon-clouds-vector-19875">FreeVector.com (clouds)</a>
        </div>
      </Grid>
    );
  }
}