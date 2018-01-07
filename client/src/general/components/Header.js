import React from 'react';
import { Header, Image } from 'semantic-ui-react'

//note: i put components used across mulitple pages in this folder across similar files
export default ({text, image}) => (
  <Header as='h1' textAlign='center'>
    <Image src={image} />{' '}{text}
  </Header>
)